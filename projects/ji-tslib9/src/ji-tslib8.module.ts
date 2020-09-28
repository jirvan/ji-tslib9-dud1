import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {CheckboxModule} from 'primeng/checkbox';
import {ColorPickerModule} from 'primeng/colorpicker';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {BlockUIModule} from 'primeng/blockui';
import {ButtonModule} from 'primeng/button';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {PanelModule} from 'primeng/panel';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ListboxModule} from 'primeng/listbox';
import {InputTextModule} from 'primeng/inputtext';
import {TabViewModule} from 'primeng/tabview';
import {FieldsetModule} from 'primeng/fieldset';
import {TooltipModule} from 'primeng/tooltip';
import {CalendarModule} from 'primeng/calendar';
import {FileUploadModule} from 'primeng/fileupload';
import {MenuModule} from 'primeng/menu';

import {JiTextfield} from "./components/ji-textfield";
import {ProgressOverlay} from "./components/progress-overlay";
import {BlockableDiv} from "./components/blockable-div";
import {JiCharfilteredfield} from "./components/ji-charfilteredfield";
import {JiCheckbox} from "./components/ji-checkbox";
import {JiCheckboxm} from "./components/ji-checkboxm";
import {JiColorpickerComponent} from "./components/ji-colorpicker.component";
import {JiColorpickerm} from "./components/ji-colorpickerm";
import {JiConfirmationDialog} from "./components/ji-confirmation-dialog";
import {JiCurrencyInput} from "./components/ji-currency-input";
import {JiCurrencyPinput} from "./components/ji-currency-pinput";
import {JiDatefield} from "./components/ji-datefield";
import {JiDatefieldm} from "./components/ji-datefieldm";
import {JiFileUploader} from "./components/ji-file-uploader";
import {JiImagefield} from "./components/ji-imagefield";
import {JiImagefieldm} from "./components/ji-imagefieldm";
import {JiIntegerfield} from "./components/ji-integerfield";
import {JiIntegerfieldm} from "./components/ji-integerfieldm";
import {JiMessageDialog} from "./components/ji-message-dialog";
import {JiTextfieldm} from "./components/ji-textfieldm";
import {CharFilterDirective} from "./directives/charFilter-directive";
import {JiDropdown} from "./components/ji-dropdown";
import {JiErrorDialog} from "./errors/ji-error-dialog";
import {JiJoblogDialogComponent} from "./ji-joblog-dialog/ji-joblog-dialog.component";
import {JiUtlService} from "./utils/ji-utl.service";

@NgModule({
            declarations: [BlockableDiv,
                           CharFilterDirective,
                           JiCharfilteredfield,
                           JiCheckbox,
                           JiCheckboxm,
                           JiColorpickerComponent,
                           JiColorpickerm,
                           JiConfirmationDialog,
                           JiCurrencyInput,
                           JiCurrencyPinput,
                           JiDatefield,
                           JiDatefieldm,
                           JiDropdown,
                           JiErrorDialog,
                           JiFileUploader,
                           JiImagefield,
                           JiImagefieldm,
                           JiIntegerfield,
                           JiIntegerfieldm,
                           JiJoblogDialogComponent,
                           JiMessageDialog,
                           JiTextfield,
                           JiTextfieldm,
                           ProgressOverlay],
            imports: [
              BrowserAnimationsModule,
              BrowserModule,
              HttpClientModule,
              FormsModule,
              ReactiveFormsModule,
              CheckboxModule,
              ColorPickerModule,
              DialogModule,
              DropdownModule,
              ProgressSpinnerModule,
              BlockUIModule,
              ContextMenuModule,
              TabViewModule,
              FileUploadModule,
              MenuModule,
              TooltipModule,
              CalendarModule,
              ButtonModule,
              TableModule,
              ListboxModule,
              InputTextModule,
              OverlayPanelModule,
              FieldsetModule,
              PanelModule,
              ScrollPanelModule
            ],
            exports: [BlockableDiv,
                      CharFilterDirective,
                      JiCharfilteredfield,
                      JiCheckbox,
                      JiCheckboxm,
                      JiColorpickerComponent,
                      JiColorpickerm,
                      JiConfirmationDialog,
                      JiCurrencyInput,
                      JiCurrencyPinput,
                      JiDatefield,
                      JiDatefieldm,
                      JiDropdown,
                      JiErrorDialog,
                      JiFileUploader,
                      JiImagefield,
                      JiImagefieldm,
                      JiIntegerfield,
                      JiIntegerfieldm,
                      JiJoblogDialogComponent,
                      JiMessageDialog,
                      JiTextfield,
                      JiTextfieldm,
                      ProgressOverlay],
            providers: [
              JiUtlService
            ]
          })
export class JiTslib8Module {}
