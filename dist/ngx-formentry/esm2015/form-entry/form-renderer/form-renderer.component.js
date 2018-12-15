/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Inject } from '@angular/core';
import 'hammerjs';
import { DEFAULT_STYLES } from './form-renderer.component.css';
import { DOCUMENT } from '@angular/common';
import { DataSources } from '../data-sources/data-sources';
import { NodeBase } from '../form-factory/form-node';
import { AfeFormGroup } from '../../abstract-controls-extension/afe-form-group';
import { ValidationFactory } from '../form-factory/validation.factory';
import { FormErrorsService } from '../services/form-errors.service';
import { concat, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
export class FormRendererComponent {
    /**
     * @param {?} validationFactory
     * @param {?} dataSources
     * @param {?} formErrorsService
     * @param {?} document
     */
    constructor(validationFactory, dataSources, formErrorsService, document) {
        this.validationFactory = validationFactory;
        this.dataSources = dataSources;
        this.formErrorsService = formErrorsService;
        this.document = document;
        this.childComponents = [];
        this.isCollapsed = false;
        this.locationsLoading = false;
        this.locationsInput$ = new Subject();
        this.activeTab = 0;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.setUpRemoteSelect();
        this.setUpFileUpload();
        if (this.node && this.node.form) {
            /** @type {?} */
            const tab = this.node.form.valueProcessingInfo.lastFormTab;
            if (tab && tab !== this.activeTab) {
                this.activeTab = tab;
            }
        }
        if (this.node && this.node.question.renderingType === 'form') {
            this.formErrorsService.announceErrorField$.subscribe((error) => {
                this.scrollToControl(error);
            });
        }
        if (this.node && this.node.question.renderingType === 'section') {
            this.isCollapsed = !((/** @type {?} */ (this.node.question))).isExpanded;
        }
        if (this.parentComponent) {
            this.parentComponent.addChildComponent(this);
        }
    }
    /**
     * @param {?} child
     * @return {?}
     */
    addChildComponent(child) {
        this.childComponents.push(child);
    }
    /**
     * @return {?}
     */
    setUpRemoteSelect() {
        if (this.node && this.node.question.extras &&
            this.node.question.renderingType === 'remote-select') {
            /** @type {?} */
            let selectQuestion = this.node.form.searchNodeByQuestionId(this.node.question.key)[0];
            this.dataSource = this.dataSources.dataSources[this.node.question.dataSource];
            /** @type {?} */
            let defaltValues = of([]);
            if (this.dataSource.resolveSelectedValue(selectQuestion.control.value)) {
                defaltValues = this.dataSource.resolveSelectedValue(selectQuestion.control.value).pipe(catchError(() => of([])));
            }
            this.locations$ = concat(defaltValues, this.locationsInput$.pipe(debounceTime(200), distinctUntilChanged(), tap(() => this.locationsLoading = true), switchMap(term => this.dataSource.searchOptions(term).pipe(catchError(() => of([])), // empty list on error
            tap(() => {
                this.locationsLoading = false;
            })))));
            if (this.dataSource && this.node.question.dataSourceOptions) {
                this.dataSource.dataSourceOptions = this.node.question.dataSourceOptions;
            }
        }
    }
    /**
     * @return {?}
     */
    setUpFileUpload() {
        if (this.node && this.node.question.extras && this.node.question.renderingType === 'file') {
            this.dataSource = this.dataSources.dataSources[this.node.question.dataSource];
            // console.log('Key', this.node.question);
            // console.log('Data source', this.dataSource);
        }
    }
    /**
     * @param {?} tabNumber
     * @return {?}
     */
    clickTab(tabNumber) {
        this.activeTab = tabNumber;
    }
    /**
     * @return {?}
     */
    loadPreviousTab() {
        if (!this.isCurrentTabFirst()) {
            this.clickTab(this.activeTab - 1);
            document.body.scrollTop = 0;
        }
    }
    /**
     * @return {?}
     */
    isCurrentTabFirst() {
        return this.activeTab === 0;
    }
    /**
     * @return {?}
     */
    isCurrentTabLast() {
        return this.activeTab === this.node.question['questions'].length - 1;
    }
    /**
     * @return {?}
     */
    loadNextTab() {
        if (!this.isCurrentTabLast()) {
            this.clickTab(this.activeTab + 1);
            document.body.scrollTop = 0;
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    tabSelected($event) {
        this.activeTab = $event.index;
        this.setPreviousTab();
    }
    /**
     * @return {?}
     */
    setPreviousTab() {
        if (this.node && this.node.form) {
            this.node.form.valueProcessingInfo['lastFormTab'] = this.activeTab;
        }
    }
    /**
     * @return {?}
     */
    hasErrors() {
        return this.node.control.touched && !this.node.control.valid;
    }
    /**
     * @return {?}
     */
    errors() {
        return this.getErrors(this.node);
    }
    /**
     * @param {?} error
     * @return {?}
     */
    scrollToControl(error) {
        /** @type {?} */
        const tab = +error.split(',')[0];
        /** @type {?} */
        const elSelector = error.split(',')[1] + 'id';
        // the tab components
        /** @type {?} */
        const tabComponent = this.childComponents[tab];
        this.clickTab(tab);
        setTimeout(() => {
            // expand all sections
            tabComponent.childComponents.forEach((section) => {
                section.isCollapsed = false;
                setTimeout(() => {
                    /** @type {?} */
                    const element = this.document.getElementById(elSelector);
                    if (element !== null && element.focus) {
                        element.focus();
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 100);
            });
        }, 200);
    }
    /**
     * @param {?} node
     * @return {?}
     */
    onDateChanged(node) {
        // console.log('Node', node);
        this.node = node;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    upload(event) {
        // console.log('Event', event);
        // console.log('Data', this.dataSource);
    }
    /**
     * @param {?} infoId
     * @return {?}
     */
    toggleInformation(infoId) {
        /** @type {?} */
        const e = document.getElementById(infoId);
        if (e.style.display === 'block') {
            e.style.display = 'none';
        }
        else {
            e.style.display = 'block';
        }
        console.log('InfoId', infoId);
    }
    /**
     * @private
     * @param {?} node
     * @return {?}
     */
    getErrors(node) {
        /** @type {?} */
        const errors = node.control.errors;
        if (errors) {
            return this.validationFactory.errors(errors, node.question);
        }
        return [];
    }
}
FormRendererComponent.decorators = [
    { type: Component, args: [{
                selector: 'form-renderer',
                template: "<!--CONTAINERS-->\n<div *ngIf=\"node.question.renderingType === 'form'\">\n  <div class=\"dropdown dropdown-tabs forms-dropdown\">\n    <a class=\"btn dropdown-toggle\" data-toggle=\"dropdown\">\n      <i class=\"fa fa-angle-double-down\"></i>\n    </a>\n    <ul class=\"dropdown-menu dropdown-menu-right forms-dropdown-menu\" role=\"menu\" aria-labelledby=\"dropdownMenu\">\n      <li *ngFor=\"let question of node.question.questions; let i = index;\" (click)=\"clickTab(i)\">\n        {{question.label}}\n      </li>\n    </ul>\n  </div>\n  <mat-tab-group (selectChange)='tabSelected($event)' [selectedIndex]='activeTab'>\n    <mat-tab [label]='question.label' *ngFor=\"let question of node.question.questions; let i = index;\">\n      <div (swipeLeft)='loadNextTab()' (swipeRight)='loadPreviousTab()'>\n        <form-renderer [node]=\"node.children[question.key]\" [parentComponent]=\"this\" [parentGroup]=\"node.control\"></form-renderer>\n      </div>\n    </mat-tab>\n  </mat-tab-group>\n\n  <div style=\"text-align: center;\">\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"loadPreviousTab()\" [ngClass]=\"{disabled: isCurrentTabFirst()}\">&lt;&lt;</button>\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"loadNextTab()\" [ngClass]=\"{disabled: isCurrentTabLast()}\">\n      &gt;&gt;</button>\n  </div>\n</div>\n<div *ngIf=\"node.question.renderingType === 'page'\">\n  <!--<h2>{{node.question.label}}</h2>-->\n  <form-renderer *ngFor=\"let question of node.question.questions\" [parentComponent]=\"this\" [node]=\"node.children[question.key]\"\n    [parentGroup]=\"parentGroup\"></form-renderer>\n</div>\n<div *ngIf=\"node.question.renderingType === 'section'\">\n  <div class=\"panel  panel-primary\">\n    <div class=\"panel-heading\">\n      <button type=\"button\" class=\"btn btn-primary pull-right\" (click)=\"isCollapsed = !isCollapsed\">\n        {{isCollapsed ? 'Show' : 'Hide'}}\n      </button> {{node.question.label}}\n    </div>\n    <div class=\"panel-body\" [collapse]=\"isCollapsed\">\n      <form-renderer *ngFor=\"let question of node.question.questions\" [parentComponent]=\"this\" [node]=\"node.children[question.key]\"\n        [parentGroup]=\"parentGroup\"></form-renderer>\n    </div>\n  </div>\n</div>\n\n<!-- MESSAGES -->\n<div *ngIf=\"node.control && node.control.alert && node.control.alert !== ''\" class=\"alert alert-warning\">\n  <a class=\"close\" data-dismiss=\"alert\">&times;</a> {{node.control.alert}}\n</div>\n\n<!--CONTROLS-->\n\n<div *ngIf=\"node.question.controlType === 0\" class=\"form-group\" [formGroup]=\"parentGroup\" [hidden]=\"node.control.hidden\"\n  [ngClass]=\"{disabled: node.control.disabled}\">\n  <!--LEAF CONTROL-->\n  <div class=\"question-area\">\n    <a class=\"form-tooltip pull-right\" (click)=\"toggleInformation(node.question.extras.id)\" data-placement=\"right\"\n      *ngIf=\"node.question && node.question.extras.questionInfo  && node.question.extras.questionInfo !== ''  && node.question.extras.questionInfo !== ' '\">\n      <i class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></i>\n    </a>\n\n    <label *ngIf=\"node.question.label\" [style.color]=\"hasErrors()? 'red' :''\" class=\"control-label\" [attr.for]=\"node.question.key\">\n      {{node.question.required === true ? '*':''}} {{node.question.label}}\n    </label>\n    <div [ngSwitch]=\"node.question.renderingType\">\n      <select class=\"form-control\" *ngSwitchCase=\"'select'\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\">\n        <option *ngFor=\"let o of node.question.options\" [ngValue]=\"o.value\">{{o.label}}\n        </option>\n      </select>\n\n      <remote-file-upload *ngSwitchCase=\"'file'\" [dataSource]=\"dataSource\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\"\n        (fileChanged)=\"upload($event)\">\n      </remote-file-upload>\n      <textarea [placeholder]=\"node.question.placeholder\" [rows]=\"node.question.rows\" class=\"form-control\"\n        *ngSwitchCase=\"'textarea'\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\">\n      </textarea>\n\n      <ng-select *ngSwitchCase=\"'remote-select'\" [items]=\"locations$ | async\" bindLabel=\"label\" bindValue=\"value\" placeholder=\"node.question.placeholder\"\n        [hideSelected]=\"true\" [loading]=\"locationsLoading\"  [typeahead]=\"locationsInput$\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\">\n      </ng-select>\n      <!-- <remote-select *ngSwitchCase=\"'remote-select'\" [placeholder]=\"node.question.placeholder\" tabindex=\"0\"\n        [dataSource]=\"dataSource\" [componentID]=\"node.question.key + 'id'\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\"></remote-select> -->\n      <!--  \n      <date-time-picker *ngSwitchCase=\"'date'\" [showTime]=\"node.question.showTime\" tabindex=\"0\" [weeks]='node.question.extras.questionOptions.weeksList'\n        (onDateChange)=\"onDateChanged(node)\" [showWeeks]=\"node.question.showWeeksAdder\" [formControlName]=\"node.question.key\"\n        [id]=\"node.question.key + 'id'\"></date-time-picker>\n  -->\n\n      <ngx-date-time-picker *ngSwitchCase=\"'date'\" [showTime]=\"node.question.showTime\" [id]=\"node.question.key + 'id'\"\n        [formControlName]=\"node.question.key\" [weeks]='node.question.extras.questionOptions.weeksList' (onDateChange)=\"onDateChanged(node)\"\n        [showWeeks]=\"node.question.showWeeksAdder\"></ngx-date-time-picker>\n      <ng-select *ngSwitchCase=\"'multi-select'\" tabindex=\"0\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\"\n        bindLabel=\"label\" bindValue=\"value\" [items]=\"node.question.options\" [multiple]=\"true\">\n      </ng-select>\n      <ng-select *ngSwitchCase=\"'single-select'\" bindLabel=\"label\" bindValue=\"value\" tabindex=\"0\" [formControlName]=\"node.question.key\"\n        [id]=\"node.question.key + 'id'\" [items]=\"node.question.options\" [multiple]=\"false\">\n      </ng-select>\n      <input class=\"form-control\" *ngSwitchCase=\"'number'\" [formControlName]=\"node.question.key \" [attr.placeholder]=\"node.question.placeholder \"\n        [type]=\"'number'\" [id]=\"node.question.key + 'id' \" [step]=\"'any'\" [min]=\"node.question.extras.questionOptions.min\"\n        [max]=\"node.question.extras.questionOptions.max\">\n      <input class=\"form-control\" *ngSwitchDefault [formControlName]=\"node.question.key \" [attr.placeholder]=\"node.question.placeholder \"\n        [type]=\"node.question.renderingType\" [id]=\"node.question.key + 'id' \">\n\n      <div *ngSwitchCase=\"'radio'\">\n        <div *ngFor=\"let o of node.question.options\">\n          <label class=\"form-control no-border\">\n            <input type=\"radio\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\" [value]=\"o.value\">\n            {{ o.label }}\n          </label>\n        </div>\n      </div>\n\n      <div *ngSwitchCase=\"'checkbox'\">\n        <checkbox [id]=\"node.question.key + 'id'\" [formControlName]=\"node.question.key\" [options]=\"node.question.options\"></checkbox>\n      </div>\n\n      <div *ngIf=\"node.question.enableHistoricalValue && node.question.historicalDisplay\">\n        <div class=\"container-fluid\">\n          <div class=\"row\">\n            <div class=\"col-xs-9\">\n              <span class=\"text-warning\">Previous Value: </span>\n              <strong>{{node.question.historicalDisplay?.text}}</strong>\n              <span *ngIf=\"node.question.showHistoricalValueDate\">\n                <span> | </span>\n                <strong class=\"text-primary\">{{node.question.historicalDisplay?._date}}</strong>\n              </span>\n\n            </div>\n            <button type=\"button\" [node]=\"node\" [name]=\"'historyValue'\" class=\"btn btn-primary btn-small col-xs-3\">Use\n              Value\n            </button>\n          </div>\n        </div>\n      </div>\n      <appointments-overview [node]=\"node\"></appointments-overview>\n      <div *ngIf=\"hasErrors() \">\n        <p *ngFor=\"let e of errors() \">\n          <span class=\"text-danger \">{{e}}</span>\n        </p>\n      </div>\n    </div>\n\n    <div class=\"question-info col-md-12 col-lg-12 col-sm-12\" id=\"{{node.question.extras.id}}\" *ngIf=\"node.question && node.question.extras.questionInfo  && node.question.extras.questionInfo !== ''  && node.question.extras.questionInfo !== ' '\">\n      {{node.question.extras.questionInfo}}\n    </div>\n\n  </div>\n</div>\n<div *ngIf=\"node.question.controlType === 1\" [hidden]=\"node.control.hidden\" [ngClass]=\"{disabled: node.control.disabled}\">\n\n\n  <!--ARRAY CONTROL-->\n  <div [ngSwitch]=\"node.question.renderingType \">\n    <div class='well' style=\"padding: 2px; \" *ngSwitchCase=\" 'repeating' \">\n      <h4 style=\"margin: 2px; font-weight: bold;\">{{node.question.label}}</h4>\n      <hr style=\"margin-left:-2px; margin-right:-2px; margin-bottom:4px; margin-top:8px; border-width:2px;\" />\n      <div [ngSwitch]=\"node.question.extras.type\">\n        <div *ngSwitchCase=\"'testOrder'\">\n          <div *ngFor=\"let child of node.children; let i=index \">\n            <form-renderer *ngFor=\"let question of child.question.questions \" [parentComponent]=\"this\" [node]=\"child.children[question.key]\n            \"\n              [parentGroup]=\"child.control \"></form-renderer>\n            <div>{{child.orderNumber}}</div>\n            <button type=\"button \" class='btn btn-sm btn-danger' (click)=\"node.removeAt(i) \">Remove</button>\n            <br />\n            <hr style=\"margin-left:-2px; margin-right:-2px; margin-bottom:4px; margin-top:8px; border-width:1px;\" />\n          </div>\n        </div>\n\n        <div *ngSwitchCase=\"'obsGroup'\" style=\"margin-bottom:20px;\">\n          <div *ngFor=\"let child of node.children; let i=index \">\n            <form-renderer *ngFor=\"let question of child.question.questions \" [parentComponent]=\"this\" [node]=\"child.children[question.key]\n            \"\n              [parentGroup]=\"child.control \"></form-renderer>\n            <button type=\"button \" class='btn btn-sm btn-danger' (click)=\"node.removeAt(i) \">Remove</button>\n            <br />\n            <hr style=\"margin-left:-2px; margin-right:-2px; margin-bottom:4px; margin-top:8px; border-width:1px;\" />\n          </div>\n        </div>\n      </div>\n      <button type=\"button \" class='btn btn-primary' (click)=\"node.createChildNode() \">Add</button>\n    </div>\n  </div>\n\n</div>\n<div *ngIf=\"node.question.controlType === 2\" [hidden]=\"node.control.hidden\" [ngClass]=\"{disabled: node.control.disabled}\">\n\n  <!--GROUP-->\n  <div [ngSwitch]=\"node.question.renderingType \">\n    <div *ngSwitchCase=\" 'group' \">\n      <form-renderer *ngFor=\"let question of node.question.questions \" [parentComponent]=\"this\" [node]=\"node.children[question.key]\n            \"\n        [parentGroup]=\"node.control \"></form-renderer>\n    </div>\n    <div *ngSwitchCase=\" 'field-set' \" style=\"border: 1px solid #eeeeee; padding: 2px; margin: 2px;\">\n      <form-renderer *ngFor=\"let question of node.question.questions \" [parentComponent]=\"this\" [node]=\"node.children[question.key]\n            \"\n        [parentGroup]=\"node.control \"></form-renderer>\n    </div>\n  </div>\n\n</div>",
                styles: ['../../style/app.css', DEFAULT_STYLES]
            }] }
];
/** @nocollapse */
FormRendererComponent.ctorParameters = () => [
    { type: ValidationFactory },
    { type: DataSources },
    { type: FormErrorsService },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
FormRendererComponent.propDecorators = {
    parentComponent: [{ type: Input }],
    node: [{ type: Input }],
    parentGroup: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    FormRendererComponent.prototype.parentComponent;
    /** @type {?} */
    FormRendererComponent.prototype.node;
    /** @type {?} */
    FormRendererComponent.prototype.parentGroup;
    /** @type {?} */
    FormRendererComponent.prototype.childComponents;
    /** @type {?} */
    FormRendererComponent.prototype.showTime;
    /** @type {?} */
    FormRendererComponent.prototype.showWeeks;
    /** @type {?} */
    FormRendererComponent.prototype.activeTab;
    /** @type {?} */
    FormRendererComponent.prototype.dataSource;
    /** @type {?} */
    FormRendererComponent.prototype.isCollapsed;
    /** @type {?} */
    FormRendererComponent.prototype.auto;
    /** @type {?} */
    FormRendererComponent.prototype.locations$;
    /** @type {?} */
    FormRendererComponent.prototype.locationsLoading;
    /** @type {?} */
    FormRendererComponent.prototype.locationsInput$;
    /**
     * @type {?}
     * @private
     */
    FormRendererComponent.prototype.validationFactory;
    /**
     * @type {?}
     * @private
     */
    FormRendererComponent.prototype.dataSources;
    /**
     * @type {?}
     * @private
     */
    FormRendererComponent.prototype.formErrorsService;
    /**
     * @type {?}
     * @private
     */
    FormRendererComponent.prototype.document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1yZW5kZXJlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tcmVuZGVyZXIvZm9ybS1yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFDakMsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxVQUFVLENBQUM7QUFDbEIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUNoRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUV2RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVwRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBYyxPQUFPLEVBQW1CLE1BQU0sTUFBTSxDQUFDO0FBR3hFLE9BQU8sRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQU8sTUFBTSxnQkFBZ0IsQ0FBQztBQU9yRyxNQUFNLE9BQU8scUJBQXFCOzs7Ozs7O0lBaUJoQyxZQUNVLGlCQUFvQyxFQUNwQyxXQUF3QixFQUN4QixpQkFBb0MsRUFDbEIsUUFBYTtRQUgvQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDbEIs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OztJQUM5QixpREFBeUI7O0lBQ3pCLGdEQUF3Qzs7Ozs7SUFHdEMsa0RBQTRDOzs7OztJQUM1Qyw0Q0FBZ0M7Ozs7O0lBQ2hDLGtEQUE0Qzs7Ozs7SUFDNUMseUNBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBJbmplY3Rcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgJ2hhbW1lcmpzJztcbmltcG9ydCB7IERFRkFVTFRfU1RZTEVTIH0gZnJvbSAnLi9mb3JtLXJlbmRlcmVyLmNvbXBvbmVudC5jc3MnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGF0YVNvdXJjZXMgfSBmcm9tICcuLi9kYXRhLXNvdXJjZXMvZGF0YS1zb3VyY2VzJztcbmltcG9ydCB7IE5vZGVCYXNlLCBMZWFmTm9kZSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuaW1wb3J0IHsgQWZlRm9ybUdyb3VwIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1mb3JtLWdyb3VwJztcbmltcG9ydCB7IFZhbGlkYXRpb25GYWN0b3J5IH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L3ZhbGlkYXRpb24uZmFjdG9yeSc7XG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xuaW1wb3J0IHsgRm9ybUVycm9yc1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9mb3JtLWVycm9ycy5zZXJ2aWNlJztcbmltcG9ydCB7IFF1ZXN0aW9uR3JvdXAgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvZ3JvdXAtcXVlc3Rpb24nO1xuaW1wb3J0IHsgY29uY2F0LCBvZiwgT2JzZXJ2YWJsZSwgU3ViamVjdCwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIHRhcCwgc3dpdGNoTWFwLCBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Zvcm0tcmVuZGVyZXInLFxuICB0ZW1wbGF0ZVVybDogJ2Zvcm0tcmVuZGVyZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZXM6IFsnLi4vLi4vc3R5bGUvYXBwLmNzcycsIERFRkFVTFRfU1RZTEVTXVxufSlcbmV4cG9ydCBjbGFzcyBGb3JtUmVuZGVyZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIHB1YmxpYyBwYXJlbnRDb21wb25lbnQ6IEZvcm1SZW5kZXJlckNvbXBvbmVudDtcbiAgQElucHV0KCkgcHVibGljIG5vZGU6IE5vZGVCYXNlO1xuICBASW5wdXQoKSBwdWJsaWMgcGFyZW50R3JvdXA6IEFmZUZvcm1Hcm91cDtcbiAgcHVibGljIGNoaWxkQ29tcG9uZW50czogRm9ybVJlbmRlcmVyQ29tcG9uZW50W10gPSBbXTtcbiAgcHVibGljIHNob3dUaW1lOiBib29sZWFuO1xuICBwdWJsaWMgc2hvd1dlZWtzOiBib29sZWFuO1xuICBwdWJsaWMgYWN0aXZlVGFiOiBudW1iZXI7XG4gIHB1YmxpYyBkYXRhU291cmNlOiBEYXRhU291cmNlO1xuICBwdWJsaWMgaXNDb2xsYXBzZWQgPSBmYWxzZTtcbiAgcHVibGljIGF1dG86IGFueTtcblxuICBsb2NhdGlvbnMkOiBPYnNlcnZhYmxlPGFueVtdPjtcbiAgbG9jYXRpb25zTG9hZGluZyA9IGZhbHNlO1xuICBsb2NhdGlvbnNJbnB1dCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB2YWxpZGF0aW9uRmFjdG9yeTogVmFsaWRhdGlvbkZhY3RvcnksXG4gICAgcHJpdmF0ZSBkYXRhU291cmNlczogRGF0YVNvdXJjZXMsXG4gICAgcHJpdmF0ZSBmb3JtRXJyb3JzU2VydmljZTogRm9ybUVycm9yc1NlcnZpY2UsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55KSB7XG4gICAgdGhpcy5hY3RpdmVUYWIgPSAwO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc2V0VXBSZW1vdGVTZWxlY3QoKTtcbiAgICB0aGlzLnNldFVwRmlsZVVwbG9hZCgpO1xuICAgIGlmICh0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLmZvcm0pIHtcbiAgICAgIGNvbnN0IHRhYiA9IHRoaXMubm9kZS5mb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8ubGFzdEZvcm1UYWI7XG4gICAgICBpZiAodGFiICYmIHRhYiAhPT0gdGhpcy5hY3RpdmVUYWIpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVUYWIgPSB0YWI7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdmb3JtJykge1xuICAgICAgdGhpcy5mb3JtRXJyb3JzU2VydmljZS5hbm5vdW5jZUVycm9yRmllbGQkLnN1YnNjcmliZShcbiAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgdGhpcy5zY3JvbGxUb0NvbnRyb2woZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5ub2RlICYmIHRoaXMubm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnc2VjdGlvbicpIHtcbiAgICAgIHRoaXMuaXNDb2xsYXBzZWQgPSAhKHRoaXMubm9kZS5xdWVzdGlvbiBhcyBRdWVzdGlvbkdyb3VwKS5pc0V4cGFuZGVkO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBhcmVudENvbXBvbmVudCkge1xuICAgICAgdGhpcy5wYXJlbnRDb21wb25lbnQuYWRkQ2hpbGRDb21wb25lbnQodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZENoaWxkQ29tcG9uZW50KGNoaWxkOiBGb3JtUmVuZGVyZXJDb21wb25lbnQpIHtcbiAgICB0aGlzLmNoaWxkQ29tcG9uZW50cy5wdXNoKGNoaWxkKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRVcFJlbW90ZVNlbGVjdCgpIHtcbiAgICBpZiAodGhpcy5ub2RlICYmIHRoaXMubm9kZS5xdWVzdGlvbi5leHRyYXMgJiZcbiAgICAgIHRoaXMubm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAncmVtb3RlLXNlbGVjdCcpIHtcbiAgICAgIGxldCBzZWxlY3RRdWVzdGlvbiA9IHRoaXMubm9kZS5mb3JtLnNlYXJjaE5vZGVCeVF1ZXN0aW9uSWQodGhpcy5ub2RlLnF1ZXN0aW9uLmtleSlbMF07XG4gICAgICB0aGlzLmRhdGFTb3VyY2UgPSB0aGlzLmRhdGFTb3VyY2VzLmRhdGFTb3VyY2VzW3RoaXMubm9kZS5xdWVzdGlvbi5kYXRhU291cmNlXTtcbiAgICAgIGxldCBkZWZhbHRWYWx1ZXMgPSBvZihbXSk7XG4gICAgICBpZiAodGhpcy5kYXRhU291cmNlLnJlc29sdmVTZWxlY3RlZFZhbHVlKHNlbGVjdFF1ZXN0aW9uLmNvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgIGRlZmFsdFZhbHVlcyA9IHRoaXMuZGF0YVNvdXJjZS5yZXNvbHZlU2VsZWN0ZWRWYWx1ZShzZWxlY3RRdWVzdGlvbi5jb250cm9sLnZhbHVlKS5waXBlKFxuICAgICAgICAgIGNhdGNoRXJyb3IoKCkgPT4gb2YoW10pKSwgLy8gZW1wdHkgbGlzdCBvbiBlcnJvclxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmxvY2F0aW9ucyQgPSBjb25jYXQoXG4gICAgICAgIGRlZmFsdFZhbHVlcyxcbiAgICAgICAgdGhpcy5sb2NhdGlvbnNJbnB1dCQucGlwZShcbiAgICAgICAgICBkZWJvdW5jZVRpbWUoMjAwKSxcbiAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgICAgIHRhcCgoKSA9PiB0aGlzLmxvY2F0aW9uc0xvYWRpbmcgPSB0cnVlKSxcbiAgICAgICAgICBzd2l0Y2hNYXAodGVybSA9PiB0aGlzLmRhdGFTb3VyY2Uuc2VhcmNoT3B0aW9ucyh0ZXJtKS5waXBlKFxuICAgICAgICAgICAgY2F0Y2hFcnJvcigoKSA9PiBvZihbXSkpLCAvLyBlbXB0eSBsaXN0IG9uIGVycm9yXG4gICAgICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmxvY2F0aW9uc0xvYWRpbmcgPSBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApKVxuICAgICAgICApXG4gICAgICApO1xuICAgICAgaWYgKHRoaXMuZGF0YVNvdXJjZSAmJiB0aGlzLm5vZGUucXVlc3Rpb24uZGF0YVNvdXJjZU9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5kYXRhU291cmNlLmRhdGFTb3VyY2VPcHRpb25zID0gdGhpcy5ub2RlLnF1ZXN0aW9uLmRhdGFTb3VyY2VPcHRpb25zO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXRVcEZpbGVVcGxvYWQoKSB7XG4gICAgaWYgKHRoaXMubm9kZSAmJiB0aGlzLm5vZGUucXVlc3Rpb24uZXh0cmFzICYmIHRoaXMubm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnZmlsZScpIHtcbiAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IHRoaXMuZGF0YVNvdXJjZXMuZGF0YVNvdXJjZXNbdGhpcy5ub2RlLnF1ZXN0aW9uLmRhdGFTb3VyY2VdO1xuICAgICAgLy8gY29uc29sZS5sb2coJ0tleScsIHRoaXMubm9kZS5xdWVzdGlvbik7XG4gICAgICAvLyBjb25zb2xlLmxvZygnRGF0YSBzb3VyY2UnLCB0aGlzLmRhdGFTb3VyY2UpO1xuICAgIH1cblxuICB9XG5cblxuICBwdWJsaWMgY2xpY2tUYWIodGFiTnVtYmVyKSB7XG4gICAgdGhpcy5hY3RpdmVUYWIgPSB0YWJOdW1iZXI7XG4gIH1cblxuICBwdWJsaWMgbG9hZFByZXZpb3VzVGFiKCkge1xuICAgIGlmICghdGhpcy5pc0N1cnJlbnRUYWJGaXJzdCgpKSB7XG4gICAgICB0aGlzLmNsaWNrVGFiKHRoaXMuYWN0aXZlVGFiIC0gMSk7XG4gICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IDA7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGlzQ3VycmVudFRhYkZpcnN0KCkge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZVRhYiA9PT0gMDtcbiAgfVxuXG4gIHB1YmxpYyBpc0N1cnJlbnRUYWJMYXN0KCkge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZVRhYiA9PT0gdGhpcy5ub2RlLnF1ZXN0aW9uWydxdWVzdGlvbnMnXS5sZW5ndGggLSAxO1xuICB9XG5cbiAgcHVibGljIGxvYWROZXh0VGFiKCkge1xuICAgIGlmICghdGhpcy5pc0N1cnJlbnRUYWJMYXN0KCkpIHtcbiAgICAgIHRoaXMuY2xpY2tUYWIodGhpcy5hY3RpdmVUYWIgKyAxKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gMDtcbiAgICB9XG4gIH1cbiAgcHVibGljIHRhYlNlbGVjdGVkKCRldmVudCkge1xuICAgIHRoaXMuYWN0aXZlVGFiID0gJGV2ZW50LmluZGV4O1xuICAgIHRoaXMuc2V0UHJldmlvdXNUYWIoKTtcbiAgfVxuICBwdWJsaWMgc2V0UHJldmlvdXNUYWIoKSB7XG4gICAgaWYgKHRoaXMubm9kZSAmJiB0aGlzLm5vZGUuZm9ybSkge1xuICAgICAgdGhpcy5ub2RlLmZvcm0udmFsdWVQcm9jZXNzaW5nSW5mb1snbGFzdEZvcm1UYWInXSA9IHRoaXMuYWN0aXZlVGFiO1xuICAgIH1cblxuICB9XG4gIHB1YmxpYyBoYXNFcnJvcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMubm9kZS5jb250cm9sLnRvdWNoZWQgJiYgIXRoaXMubm9kZS5jb250cm9sLnZhbGlkO1xuICB9XG5cbiAgcHVibGljIGVycm9ycygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFcnJvcnModGhpcy5ub2RlKTtcbiAgfVxuXG5cbiAgcHVibGljIHNjcm9sbFRvQ29udHJvbChlcnJvcjogc3RyaW5nKSB7XG5cbiAgICBjb25zdCB0YWI6IG51bWJlciA9ICtlcnJvci5zcGxpdCgnLCcpWzBdO1xuICAgIGNvbnN0IGVsU2VsZWN0b3IgPSBlcnJvci5zcGxpdCgnLCcpWzFdICsgJ2lkJztcblxuICAgIC8vIHRoZSB0YWIgY29tcG9uZW50c1xuICAgIGNvbnN0IHRhYkNvbXBvbmVudDogRm9ybVJlbmRlcmVyQ29tcG9uZW50ID0gdGhpcy5jaGlsZENvbXBvbmVudHNbdGFiXTtcblxuICAgIHRoaXMuY2xpY2tUYWIodGFiKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICAvLyBleHBhbmQgYWxsIHNlY3Rpb25zXG4gICAgICB0YWJDb21wb25lbnQuY2hpbGRDb21wb25lbnRzLmZvckVhY2goKHNlY3Rpb24pID0+IHtcbiAgICAgICAgc2VjdGlvbi5pc0NvbGxhcHNlZCA9IGZhbHNlO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGVsZW1lbnQ6IGFueSA9IHRoaXMuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxTZWxlY3Rvcik7XG4gICAgICAgICAgaWYgKGVsZW1lbnQgIT09IG51bGwgJiYgZWxlbWVudC5mb2N1cykge1xuICAgICAgICAgICAgZWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgZWxlbWVudC5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiAnc21vb3RoJywgYmxvY2s6ICdjZW50ZXInIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwKTtcbiAgICAgIH0pO1xuXG4gICAgfSwgMjAwKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkRhdGVDaGFuZ2VkKG5vZGU6IExlYWZOb2RlKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ05vZGUnLCBub2RlKTtcbiAgICB0aGlzLm5vZGUgPSBub2RlO1xuICB9XG5cbiAgcHVibGljIHVwbG9hZChldmVudCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdFdmVudCcsIGV2ZW50KTtcbiAgICAvLyBjb25zb2xlLmxvZygnRGF0YScsIHRoaXMuZGF0YVNvdXJjZSk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlSW5mb3JtYXRpb24oaW5mb0lkKSB7XG4gICAgY29uc3QgZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGluZm9JZCk7XG5cbiAgICBpZiAoZS5zdHlsZS5kaXNwbGF5ID09PSAnYmxvY2snKSB7XG4gICAgICBlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfVxuXG5cbiAgICBjb25zb2xlLmxvZygnSW5mb0lkJywgaW5mb0lkKTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBnZXRFcnJvcnMobm9kZTogTm9kZUJhc2UpIHtcbiAgICBjb25zdCBlcnJvcnM6IGFueSA9IG5vZGUuY29udHJvbC5lcnJvcnM7XG5cbiAgICBpZiAoZXJyb3JzKSB7XG5cbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRpb25GYWN0b3J5LmVycm9ycyhlcnJvcnMsIG5vZGUucXVlc3Rpb24pO1xuICAgIH1cblxuICAgIHJldHVybiBbXTtcbiAgfVxufVxuIl19