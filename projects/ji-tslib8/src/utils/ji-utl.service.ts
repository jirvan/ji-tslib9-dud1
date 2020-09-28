/*

 Copyright (c) 2020 Jirvan Pty Ltd
 All rights reserved.

 Redistribution and use in source and binary forms, with or without modification,
 are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice,
 this list of conditions and the following disclaimer in the documentation
 and/or other materials provided with the distribution.
 * Neither the name of Jirvan Pty Ltd nor the names of its contributors
 may be used to endorse or promote products derived from this software
 without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

 */

import {Injectable} from '@angular/core';
import {SelectItem} from 'primeng/api';

@Injectable()
export class JiUtlService {

  public extractSelectItemsList(allItemsLabel: string, labelField: string, objectsToFilter): SelectItem[] {

    // Get a sorted set of label/values
    const set = new Set<string>();
    for (const object of objectsToFilter) {
      set.add(object[labelField]);
    }
    const sortedLabelValues: string[] = Array.from(set).sort();

    // Build and return select items
    const selectItems: SelectItem[] = [
      {label: allItemsLabel, value: null}
    ];
    for (const labelValue of sortedLabelValues) {
      selectItems.push({label: labelValue, value: labelValue});
    }
    return selectItems;

  }

  public toDateString(date?: Date | string): string | undefined | null {
    if (date === undefined) {
      return undefined;
    } else if (date === null) {
      return null;
    } else {
      let dateValue: Date = typeof date === 'string' ? new Date(date) : date;
      return dateValue.getFullYear()
             + "-" + ("0" + (dateValue.getMonth() + 1)).slice(-2)
             + "-" + ("0" + dateValue.getDate()).slice(-2);
    }
  }

  toDate(dateString?: string): Date | undefined {
    if (!dateString) {
      return undefined;
    } else {
      var myRegexp = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
      let match: string[] | null = myRegexp.exec(dateString);
      if (match && match.length === 4) {
        let year: number = +match[1];
        let month: number = +match[2];
        let day: number = +match[3];
        return new Date(year, month - 1, day);
      } else {
        throw new Error('Invalid date string: "' + dateString + '" (must have format "YYYY-MM-DD")');
      }
    }
  }

  coalesce(...values: any[]) {
    for (const value of values) {
      if (value != undefined && value != null) {
        return value;
      }
    }
    return undefined;
  }

}
