import { Component, OnInit } from '@angular/core';
import { UploaderService } from '../../services/services';
import { SwalHelper, ToastHelper } from '../../helpers/helpers';
import { Module, Position, Modal } from '../../models/models';

@Component({
    selector: 'position-component',
    templateUrl: './app/components/uploader/uploader.page.html',
    providers: [
        UploaderService,
        SwalHelper,
        ToastHelper
    ]
})

export class UploaderComponent {

}