import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the FetchCalendarServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class FetchCalendarServiceProvider {

  public caldata:Array<{
    'DTEND;TZID=Asia/Tokyo': string
    'DTSTAMP': string
    'DTSTART;TZID=Asia/Tokyo':string
    'LAST-MODIFIED': string
    'LOCATION': string
    'SUMMARY':string
    'UID': string
  }>;
  public lectureList:Array<{
    'name': string,
    'location': string,
    'dates': Array<{
      'start':Date,
        'end': Date
    }>
  }> = [];

  constructor(public http: HttpClient) {
    console.log('Hello FetchCalendarServiceProvider Provider');
    //会津大学のサイトから授業情報を持ってくる
    // TODO:　自分のiCal形式のカレンダーを自由に登録できるようにする　
    http.get("https://powerful-wave-23015.herokuapp.com/https://csweb.u-aizu.ac.jp/calendar/882f86382b909d70cb21825f2e737c69fe7370e6-J.ics",
      {responseType: 'text'})
      .subscribe(data => {
        this.caldata = FetchCalendarServiceProvider.convert(data)["VCALENDAR"][0]["VEVENT"];
        //nameをキーとして重複無しで取り出す
        /*let lectures = this.caldata.filter((v1,i1,a1) => {
          return (a1.findIndex(v2 => {
            return (v1.SUMMARY===v2.SUMMARY)
          }) === i1);
        });*/

        this.caldata.sort((a, b) => {
          if (a['SUMMARY'] < b['SUMMARY']) return -1;
          if (a['SUMMARY'] > b['SUMMARY']) return 1;
          return 0;
        });

        console.log(this.lectureList);

        //{name, datetime[]} という感じのリストを作る
        for(let i = 0; i < this.caldata.length;){
          //console.log(this.caldata[i]);

          this.lectureList[this.lectureList.length]  = {
            'name': this.caldata[i]["SUMMARY"],
            'location': this.caldata[i]["LOCATION"],
            'dates': []
          };
          let j=0;
          while(i < this.caldata.length && (j==0||this.caldata[i-1]["SUMMARY"] == this.caldata[i]["SUMMARY"])){
            //console.log(i+" "+j+":"+this.caldata[i]["SUMMARY"]);
            this.lectureList[this.lectureList.length-1]['dates'][j] = {
              'start': FetchCalendarServiceProvider.dateFormat(this.caldata[i]["DTSTART;TZID=Asia/Tokyo"]),
              'end': FetchCalendarServiceProvider.dateFormat(this.caldata[i]["DTEND;TZID=Asia/Tokyo"])
            };
            i++;j++;
          }
          if(i < this.caldata.length)console.log("Break"+i+" "+j+":"+this.caldata[i]["SUMMARY"]);
        }
        for(let i = 0; i < this.lectureList.length;i++) {
            this.lectureList[i].dates.sort(function (a, b) {
                if (a.start.getTime() < b.start.getTime()) return -1;
                if (a.start.getTime() > b.start.getTime()) return 1;
                return 0;
            });
        }
        console.log(this.lectureList);
      });

  }

  static dateFormat(str:string):Date{
    let arr: string[] = (str.substr(0, 4) + '/' + str.substr(4, 2) + '/' + str.substr(6, 2)
      + '/' + str.substr(9, 2)+ '/' + str.substr(11, 2)+ '/' + str.substr(13, 2))
      .split('/');
    return new Date(Number(arr[0]), Number(arr[1]) - 1, Number(arr[2]), Number(arr[3]), Number(arr[4]), Number(arr[5]));
  }

  //Ical2Jsonの移植スクリプト

  static readonly NEW_LINE: RegExp = /\r\n|\n|\r/;


  /**
   * Take ical string data and convert to JSON
   *
   * @returns {Object}
   * @param source sourceUrl
   */
  static convert(source :string) {
    let currentKey:string = "",
      currentValue:string = "",
      //objectNames:string[] = [],
      output:string[] = [],
      parentObj:string[] = [],
      lines:string[] = source.split(FetchCalendarServiceProvider.NEW_LINE),
      splitAt;
    let currentObj: any = output;
    let parents = [];


    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      if (line.charAt(0) === " ") {
        currentObj[currentKey] += line.substr(1);

      } else {
        splitAt = line.indexOf(":");

        if (splitAt < 0) {
          continue;
        }

        currentKey = line.substr(0, splitAt);
        currentValue = line.substr(splitAt + 1);

        switch (currentKey) {
          // TODO: もっと一般化されたフォーマットでも使えるようにする
          case "BEGIN":
            parents.push(parentObj);
            parentObj = currentObj;
            if (parentObj[currentValue] == null) {
              parentObj[currentValue] = [];
            }

            // Create a new object, store the reference for future uses
            currentObj = {};
            parentObj[currentValue].push(currentObj);
            break;
          case "END":
            currentObj = parentObj;
            parentObj = parents.pop();
            break;
          case "LOCATION":
          case "LAST-MODIFIED":
          case "DTSTART;TZID=Asia/Tokyo":
          case "DTEND;TZID=Asia/Tokyo":
          case "DTSTAMP":
          case "UID":
          case "SUMMARY":
          //default:
            if(currentObj[currentKey]) {
              if(!Array.isArray(currentObj[currentKey])) {
                currentObj[currentKey] = [currentObj[currentKey]];
              }
              currentObj[currentKey].push(currentValue);
            } else {
              currentObj[currentKey] = currentValue;
            }
        }
      }
    }
    return output;
  };

  /**
   * Take JSON, revert back to ical
   * @param {Object} object
   * @return {String}
   */
  static revert(object) {
    let lines = [];

    for (let key in object) {
      let value = object[key];
      if (Array.isArray(value)) {
        value.forEach((item) => {
          lines.push(`BEGIN:${key}`);
          lines.push(FetchCalendarServiceProvider.revert(item));
          lines.push(`END:${key}`);
        });
      } else {
        let fullLine = `${key}:${value}`;
        do {
          // According to ical spec, lines of text should be no longer
          // than 75 octets
          lines.push(fullLine.substr(0, 75));
          fullLine = ' ' + fullLine.substr(75);
        } while (fullLine.length > 1);
      }
    }

    return lines.join('\n');
  };

}
