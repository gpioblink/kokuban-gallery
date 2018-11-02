import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the FetchCalendarServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FetchCalendarServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello FetchCalendarServiceProvider Provider');
  }


  //Ical2Jsonの移植スクリプト

  static readonly NEW_LINE: RegExp = /\r\n|\n|\r/;
  /**
   * Take ical string data and convert to JSON
   *
   * @param {string} source
   * @returns {Object}
   */
  static convert(source :string) {
    let currentKey:string = "",
      currentValue:string = "",
      //objectNames:string[] = [],
      output = {},
      parentObj = {},
      lines = source.split(FetchCalendarServiceProvider.NEW_LINE),
      splitAt;

    let currentObj = output;
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
          default:
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
