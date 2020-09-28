/*

 Copyright (c) 2018, 2020 Jirvan Pty Ltd
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

import {Component} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {Job} from './job';

@Component({
               // tslint:disable-next-line:component-selector
               selector: 'ji-joblog-dialog',
               template: `
                   <div>
                       <p-dialog header="{{dialogTitle}}" [(visible)]="display" modal="modal" [closable]="false"
                                 [resizable]="true" [draggable]="true" [responsive]="true" [breakpoint]="1000" [width]="1000" [minY]="20">
                           <div style="min-height: 600px; position: relative">
                               <pre style="position: absolute; top: 1em; right: 1em; bottom: 1em; left: 1em">{{logText}}</pre>
                           </div>
                           <p-footer>
                               <button type="button" pButton icon="ui-icon-check" (click)="onOk()" label="OK" [disabled]="okButtonDisabled"></button>
                           </p-footer>
                       </p-dialog>
                   </div>
               `
           })
export class JiJoblogDialogComponent {

    jobDescription: string;
    dialogTitle: string;
    okButtonDisabled = true;
    logTextPrefix: string;
    logText: string;
    thenFunction: (result) => void;

    constructor(private http: HttpClient) { }

    display = false;

    showDialog(dialogTitle: string, jobDescription: string, startUrl: string, thenFunction?: (result) => void) {
        this.okButtonDisabled = true;
        this.jobDescription = jobDescription;
        this.dialogTitle = dialogTitle;
        this.thenFunction = thenFunction;
        this.display = true;
        this.logTextPrefix = 'Starting ' + jobDescription;
        this.logText = this.logTextPrefix;
        this.http.post<Job>(startUrl, null)
            .pipe(
                catchError(err => {
                    this.processError(err);
                    return of({jobId: null, status: 'finishedWithError', log: null});
                })
            )
            .subscribe(job => {
                if (job) {
                    this.checkJobStatus(job, '/jobpool/getJobDetails');
                }
            })
        ;
    }

    onOk() {
        this.display = false;
        if (this.thenFunction) {
            this.thenFunction(undefined);
        }
    }

    refreshLog(jobDetailsUrl, jobId) {

        this.http.post(jobDetailsUrl, jobId)
            .pipe(
                catchError(err => {
                    this.processError(err);
                    return of({jobId: null, status: 'finishedWithError', log: null});
                })
            )
            .subscribe(job => {
                if (job) {
                    this.checkJobStatus(job, jobDetailsUrl);
                }
            });

    }

    processError(error: any) {
        if (error instanceof HttpErrorResponse) {
            let message: string;
            if (error.error && error.error.errorName) {
                message = error.error.errorName + ': ' + error.error.errorMessage;
            } else {
                message = error.message;
            }
            console.error(message);
            alert(message);
        } else if (error.message) {
            console.error(error.message);
            alert(error.message);
        } else {
            console.error(error);
            alert(error);
        }
        this.okButtonDisabled = false;
    }

    checkJobStatus(job, jobDetailsUrl: string) {
        if (job.log) {
            this.logText = this.logTextPrefix + job.log;
        }
        //               $timeout(scrollBottom, 0);
        if (job.status === 'inProgress') {
            setTimeout(() => {
                this.refreshLog(jobDetailsUrl, job.jobId);
            }, 1000);
        } else if (job.status === 'finishedSuccessfully') {
            this.logText = this.logText + '\nFinished ' + this.jobDescription;
            this.okButtonDisabled = false;
        } else if (job.status === 'finishedWithError') {
            this.logText = this.logText + '\n\n\n===== ' + this.jobDescription + ' finished with Error =====';
            this.okButtonDisabled = false;
        } else {
            this.logText = this.logText + '\n\n\n===== ' + this.jobDescription + ' finished with unrecognized status "' + job.status + '" =====';
            this.okButtonDisabled = false;
        }
    }

}
