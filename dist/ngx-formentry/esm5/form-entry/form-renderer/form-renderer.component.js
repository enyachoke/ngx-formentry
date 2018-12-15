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
var FormRendererComponent = /** @class */ (function () {
    function FormRendererComponent(validationFactory, dataSources, formErrorsService, document) {
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
    FormRendererComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.setUpRemoteSelect();
        this.setUpFileUpload();
        if (this.node && this.node.form) {
            /** @type {?} */
            var tab = this.node.form.valueProcessingInfo.lastFormTab;
            if (tab && tab !== this.activeTab) {
                this.activeTab = tab;
            }
        }
        if (this.node && this.node.question.renderingType === 'form') {
            this.formErrorsService.announceErrorField$.subscribe(function (error) {
                _this.scrollToControl(error);
            });
        }
        if (this.node && this.node.question.renderingType === 'section') {
            this.isCollapsed = !((/** @type {?} */ (this.node.question))).isExpanded;
        }
        if (this.parentComponent) {
            this.parentComponent.addChildComponent(this);
        }
    };
    /**
     * @param {?} child
     * @return {?}
     */
    FormRendererComponent.prototype.addChildComponent = /**
     * @param {?} child
     * @return {?}
     */
    function (child) {
        this.childComponents.push(child);
    };
    /**
     * @return {?}
     */
    FormRendererComponent.prototype.setUpRemoteSelect = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.node && this.node.question.extras &&
            this.node.question.renderingType === 'remote-select') {
            /** @type {?} */
            var selectQuestion = this.node.form.searchNodeByQuestionId(this.node.question.key)[0];
            this.dataSource = this.dataSources.dataSources[this.node.question.dataSource];
            /** @type {?} */
            var defaltValues = of([]);
            if (this.dataSource.resolveSelectedValue(selectQuestion.control.value)) {
                defaltValues = this.dataSource.resolveSelectedValue(selectQuestion.control.value);
            }
            this.locations$ = concat(defaltValues, this.locationsInput$.pipe(debounceTime(200), distinctUntilChanged(), tap(function () { return _this.locationsLoading = true; }), switchMap(function (term) { return _this.dataSource.searchOptions(term).pipe(catchError(function () { return of([]); }), // empty list on error
            tap(function () {
                _this.locationsLoading = false;
            })); })));
            if (this.dataSource && this.node.question.dataSourceOptions) {
                this.dataSource.dataSourceOptions = this.node.question.dataSourceOptions;
            }
        }
    };
    /**
     * @return {?}
     */
    FormRendererComponent.prototype.setUpFileUpload = /**
     * @return {?}
     */
    function () {
        if (this.node && this.node.question.extras && this.node.question.renderingType === 'file') {
            this.dataSource = this.dataSources.dataSources[this.node.question.dataSource];
            // console.log('Key', this.node.question);
            // console.log('Data source', this.dataSource);
        }
    };
    /**
     * @param {?} tabNumber
     * @return {?}
     */
    FormRendererComponent.prototype.clickTab = /**
     * @param {?} tabNumber
     * @return {?}
     */
    function (tabNumber) {
        this.activeTab = tabNumber;
    };
    /**
     * @return {?}
     */
    FormRendererComponent.prototype.loadPreviousTab = /**
     * @return {?}
     */
    function () {
        if (!this.isCurrentTabFirst()) {
            this.clickTab(this.activeTab - 1);
            document.body.scrollTop = 0;
        }
    };
    /**
     * @return {?}
     */
    FormRendererComponent.prototype.isCurrentTabFirst = /**
     * @return {?}
     */
    function () {
        return this.activeTab === 0;
    };
    /**
     * @return {?}
     */
    FormRendererComponent.prototype.isCurrentTabLast = /**
     * @return {?}
     */
    function () {
        return this.activeTab === this.node.question['questions'].length - 1;
    };
    /**
     * @return {?}
     */
    FormRendererComponent.prototype.loadNextTab = /**
     * @return {?}
     */
    function () {
        if (!this.isCurrentTabLast()) {
            this.clickTab(this.activeTab + 1);
            document.body.scrollTop = 0;
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    FormRendererComponent.prototype.tabSelected = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.activeTab = $event.index;
        this.setPreviousTab();
    };
    /**
     * @return {?}
     */
    FormRendererComponent.prototype.setPreviousTab = /**
     * @return {?}
     */
    function () {
        if (this.node && this.node.form) {
            this.node.form.valueProcessingInfo['lastFormTab'] = this.activeTab;
        }
    };
    /**
     * @return {?}
     */
    FormRendererComponent.prototype.hasErrors = /**
     * @return {?}
     */
    function () {
        return this.node.control.touched && !this.node.control.valid;
    };
    /**
     * @return {?}
     */
    FormRendererComponent.prototype.errors = /**
     * @return {?}
     */
    function () {
        return this.getErrors(this.node);
    };
    /**
     * @param {?} error
     * @return {?}
     */
    FormRendererComponent.prototype.scrollToControl = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
        var _this = this;
        /** @type {?} */
        var tab = +error.split(',')[0];
        /** @type {?} */
        var elSelector = error.split(',')[1] + 'id';
        // the tab components
        /** @type {?} */
        var tabComponent = this.childComponents[tab];
        this.clickTab(tab);
        setTimeout(function () {
            // expand all sections
            tabComponent.childComponents.forEach(function (section) {
                section.isCollapsed = false;
                setTimeout(function () {
                    /** @type {?} */
                    var element = _this.document.getElementById(elSelector);
                    if (element !== null && element.focus) {
                        element.focus();
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 100);
            });
        }, 200);
    };
    /**
     * @param {?} node
     * @return {?}
     */
    FormRendererComponent.prototype.onDateChanged = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        // console.log('Node', node);
        this.node = node;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FormRendererComponent.prototype.upload = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // console.log('Event', event);
        // console.log('Data', this.dataSource);
    };
    /**
     * @param {?} infoId
     * @return {?}
     */
    FormRendererComponent.prototype.toggleInformation = /**
     * @param {?} infoId
     * @return {?}
     */
    function (infoId) {
        /** @type {?} */
        var e = document.getElementById(infoId);
        if (e.style.display === 'block') {
            e.style.display = 'none';
        }
        else {
            e.style.display = 'block';
        }
        console.log('InfoId', infoId);
    };
    /**
     * @private
     * @param {?} node
     * @return {?}
     */
    FormRendererComponent.prototype.getErrors = /**
     * @private
     * @param {?} node
     * @return {?}
     */
    function (node) {
        /** @type {?} */
        var errors = node.control.errors;
        if (errors) {
            return this.validationFactory.errors(errors, node.question);
        }
        return [];
    };
    FormRendererComponent.decorators = [
        { type: Component, args: [{
                    selector: 'form-renderer',
                    template: "<!--CONTAINERS-->\n<div *ngIf=\"node.question.renderingType === 'form'\">\n  <div class=\"dropdown dropdown-tabs forms-dropdown\">\n    <a class=\"btn dropdown-toggle\" data-toggle=\"dropdown\">\n      <i class=\"fa fa-angle-double-down\"></i>\n    </a>\n    <ul class=\"dropdown-menu dropdown-menu-right forms-dropdown-menu\" role=\"menu\" aria-labelledby=\"dropdownMenu\">\n      <li *ngFor=\"let question of node.question.questions; let i = index;\" (click)=\"clickTab(i)\">\n        {{question.label}}\n      </li>\n    </ul>\n  </div>\n  <mat-tab-group (selectChange)='tabSelected($event)' [selectedIndex]='activeTab'>\n    <mat-tab [label]='question.label' *ngFor=\"let question of node.question.questions; let i = index;\">\n      <div (swipeLeft)='loadNextTab()' (swipeRight)='loadPreviousTab()'>\n        <form-renderer [node]=\"node.children[question.key]\" [parentComponent]=\"this\" [parentGroup]=\"node.control\"></form-renderer>\n      </div>\n    </mat-tab>\n  </mat-tab-group>\n\n  <div style=\"text-align: center;\">\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"loadPreviousTab()\" [ngClass]=\"{disabled: isCurrentTabFirst()}\">&lt;&lt;</button>\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"loadNextTab()\" [ngClass]=\"{disabled: isCurrentTabLast()}\">\n      &gt;&gt;</button>\n  </div>\n</div>\n<div *ngIf=\"node.question.renderingType === 'page'\">\n  <!--<h2>{{node.question.label}}</h2>-->\n  <form-renderer *ngFor=\"let question of node.question.questions\" [parentComponent]=\"this\" [node]=\"node.children[question.key]\"\n    [parentGroup]=\"parentGroup\"></form-renderer>\n</div>\n<div *ngIf=\"node.question.renderingType === 'section'\">\n  <div class=\"panel  panel-primary\">\n    <div class=\"panel-heading\">\n      <button type=\"button\" class=\"btn btn-primary pull-right\" (click)=\"isCollapsed = !isCollapsed\">\n        {{isCollapsed ? 'Show' : 'Hide'}}\n      </button> {{node.question.label}}\n    </div>\n    <div class=\"panel-body\" [collapse]=\"isCollapsed\">\n      <form-renderer *ngFor=\"let question of node.question.questions\" [parentComponent]=\"this\" [node]=\"node.children[question.key]\"\n        [parentGroup]=\"parentGroup\"></form-renderer>\n    </div>\n  </div>\n</div>\n\n<!-- MESSAGES -->\n<div *ngIf=\"node.control && node.control.alert && node.control.alert !== ''\" class=\"alert alert-warning\">\n  <a class=\"close\" data-dismiss=\"alert\">&times;</a> {{node.control.alert}}\n</div>\n\n<!--CONTROLS-->\n\n<div *ngIf=\"node.question.controlType === 0\" class=\"form-group\" [formGroup]=\"parentGroup\" [hidden]=\"node.control.hidden\"\n  [ngClass]=\"{disabled: node.control.disabled}\">\n  <!--LEAF CONTROL-->\n  <div class=\"question-area\">\n    <a class=\"form-tooltip pull-right\" (click)=\"toggleInformation(node.question.extras.id)\" data-placement=\"right\"\n      *ngIf=\"node.question && node.question.extras.questionInfo  && node.question.extras.questionInfo !== ''  && node.question.extras.questionInfo !== ' '\">\n      <i class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></i>\n    </a>\n\n    <label *ngIf=\"node.question.label\" [style.color]=\"hasErrors()? 'red' :''\" class=\"control-label\" [attr.for]=\"node.question.key\">\n      {{node.question.required === true ? '*':''}} {{node.question.label}}\n    </label>\n    <div [ngSwitch]=\"node.question.renderingType\">\n      <select class=\"form-control\" *ngSwitchCase=\"'select'\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\">\n        <option *ngFor=\"let o of node.question.options\" [ngValue]=\"o.value\">{{o.label}}\n        </option>\n      </select>\n\n      <remote-file-upload *ngSwitchCase=\"'file'\" [dataSource]=\"dataSource\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\"\n        (fileChanged)=\"upload($event)\">\n      </remote-file-upload>\n      <textarea [placeholder]=\"node.question.placeholder\" [rows]=\"node.question.rows\" class=\"form-control\"\n        *ngSwitchCase=\"'textarea'\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\">\n      </textarea>\n\n      <ng-select *ngSwitchCase=\"'remote-select'\" [items]=\"locations$ | async\" bindLabel=\"label\" bindValue=\"value\" placeholder=\"node.question.placeholder\"\n        [hideSelected]=\"true\" [loading]=\"locationsLoading\"  [typeahead]=\"locationsInput$\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\">\n      </ng-select>\n      <!-- <remote-select *ngSwitchCase=\"'remote-select'\" [placeholder]=\"node.question.placeholder\" tabindex=\"0\"\n        [dataSource]=\"dataSource\" [componentID]=\"node.question.key + 'id'\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\"></remote-select> -->\n      <!--  \n      <date-time-picker *ngSwitchCase=\"'date'\" [showTime]=\"node.question.showTime\" tabindex=\"0\" [weeks]='node.question.extras.questionOptions.weeksList'\n        (onDateChange)=\"onDateChanged(node)\" [showWeeks]=\"node.question.showWeeksAdder\" [formControlName]=\"node.question.key\"\n        [id]=\"node.question.key + 'id'\"></date-time-picker>\n  -->\n\n      <ngx-date-time-picker *ngSwitchCase=\"'date'\" [showTime]=\"node.question.showTime\" [id]=\"node.question.key + 'id'\"\n        [formControlName]=\"node.question.key\" [weeks]='node.question.extras.questionOptions.weeksList' (onDateChange)=\"onDateChanged(node)\"\n        [showWeeks]=\"node.question.showWeeksAdder\"></ngx-date-time-picker>\n      <ng-select *ngSwitchCase=\"'multi-select'\" tabindex=\"0\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\"\n        bindLabel=\"label\" bindValue=\"value\" [items]=\"node.question.options\" [multiple]=\"true\">\n      </ng-select>\n      <ng-select *ngSwitchCase=\"'single-select'\" bindLabel=\"label\" bindValue=\"value\" tabindex=\"0\" [formControlName]=\"node.question.key\"\n        [id]=\"node.question.key + 'id'\" [items]=\"node.question.options\" [multiple]=\"false\">\n      </ng-select>\n      <input class=\"form-control\" *ngSwitchCase=\"'number'\" [formControlName]=\"node.question.key \" [attr.placeholder]=\"node.question.placeholder \"\n        [type]=\"'number'\" [id]=\"node.question.key + 'id' \" [step]=\"'any'\" [min]=\"node.question.extras.questionOptions.min\"\n        [max]=\"node.question.extras.questionOptions.max\">\n      <input class=\"form-control\" *ngSwitchDefault [formControlName]=\"node.question.key \" [attr.placeholder]=\"node.question.placeholder \"\n        [type]=\"node.question.renderingType\" [id]=\"node.question.key + 'id' \">\n\n      <div *ngSwitchCase=\"'radio'\">\n        <div *ngFor=\"let o of node.question.options\">\n          <label class=\"form-control no-border\">\n            <input type=\"radio\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\" [value]=\"o.value\">\n            {{ o.label }}\n          </label>\n        </div>\n      </div>\n\n      <div *ngSwitchCase=\"'checkbox'\">\n        <checkbox [id]=\"node.question.key + 'id'\" [formControlName]=\"node.question.key\" [options]=\"node.question.options\"></checkbox>\n      </div>\n\n      <div *ngIf=\"node.question.enableHistoricalValue && node.question.historicalDisplay\">\n        <div class=\"container-fluid\">\n          <div class=\"row\">\n            <div class=\"col-xs-9\">\n              <span class=\"text-warning\">Previous Value: </span>\n              <strong>{{node.question.historicalDisplay?.text}}</strong>\n              <span *ngIf=\"node.question.showHistoricalValueDate\">\n                <span> | </span>\n                <strong class=\"text-primary\">{{node.question.historicalDisplay?._date}}</strong>\n              </span>\n\n            </div>\n            <button type=\"button\" [node]=\"node\" [name]=\"'historyValue'\" class=\"btn btn-primary btn-small col-xs-3\">Use\n              Value\n            </button>\n          </div>\n        </div>\n      </div>\n      <appointments-overview [node]=\"node\"></appointments-overview>\n      <div *ngIf=\"hasErrors() \">\n        <p *ngFor=\"let e of errors() \">\n          <span class=\"text-danger \">{{e}}</span>\n        </p>\n      </div>\n    </div>\n\n    <div class=\"question-info col-md-12 col-lg-12 col-sm-12\" id=\"{{node.question.extras.id}}\" *ngIf=\"node.question && node.question.extras.questionInfo  && node.question.extras.questionInfo !== ''  && node.question.extras.questionInfo !== ' '\">\n      {{node.question.extras.questionInfo}}\n    </div>\n\n  </div>\n</div>\n<div *ngIf=\"node.question.controlType === 1\" [hidden]=\"node.control.hidden\" [ngClass]=\"{disabled: node.control.disabled}\">\n\n\n  <!--ARRAY CONTROL-->\n  <div [ngSwitch]=\"node.question.renderingType \">\n    <div class='well' style=\"padding: 2px; \" *ngSwitchCase=\" 'repeating' \">\n      <h4 style=\"margin: 2px; font-weight: bold;\">{{node.question.label}}</h4>\n      <hr style=\"margin-left:-2px; margin-right:-2px; margin-bottom:4px; margin-top:8px; border-width:2px;\" />\n      <div [ngSwitch]=\"node.question.extras.type\">\n        <div *ngSwitchCase=\"'testOrder'\">\n          <div *ngFor=\"let child of node.children; let i=index \">\n            <form-renderer *ngFor=\"let question of child.question.questions \" [parentComponent]=\"this\" [node]=\"child.children[question.key]\n            \"\n              [parentGroup]=\"child.control \"></form-renderer>\n            <div>{{child.orderNumber}}</div>\n            <button type=\"button \" class='btn btn-sm btn-danger' (click)=\"node.removeAt(i) \">Remove</button>\n            <br />\n            <hr style=\"margin-left:-2px; margin-right:-2px; margin-bottom:4px; margin-top:8px; border-width:1px;\" />\n          </div>\n        </div>\n\n        <div *ngSwitchCase=\"'obsGroup'\" style=\"margin-bottom:20px;\">\n          <div *ngFor=\"let child of node.children; let i=index \">\n            <form-renderer *ngFor=\"let question of child.question.questions \" [parentComponent]=\"this\" [node]=\"child.children[question.key]\n            \"\n              [parentGroup]=\"child.control \"></form-renderer>\n            <button type=\"button \" class='btn btn-sm btn-danger' (click)=\"node.removeAt(i) \">Remove</button>\n            <br />\n            <hr style=\"margin-left:-2px; margin-right:-2px; margin-bottom:4px; margin-top:8px; border-width:1px;\" />\n          </div>\n        </div>\n      </div>\n      <button type=\"button \" class='btn btn-primary' (click)=\"node.createChildNode() \">Add</button>\n    </div>\n  </div>\n\n</div>\n<div *ngIf=\"node.question.controlType === 2\" [hidden]=\"node.control.hidden\" [ngClass]=\"{disabled: node.control.disabled}\">\n\n  <!--GROUP-->\n  <div [ngSwitch]=\"node.question.renderingType \">\n    <div *ngSwitchCase=\" 'group' \">\n      <form-renderer *ngFor=\"let question of node.question.questions \" [parentComponent]=\"this\" [node]=\"node.children[question.key]\n            \"\n        [parentGroup]=\"node.control \"></form-renderer>\n    </div>\n    <div *ngSwitchCase=\" 'field-set' \" style=\"border: 1px solid #eeeeee; padding: 2px; margin: 2px;\">\n      <form-renderer *ngFor=\"let question of node.question.questions \" [parentComponent]=\"this\" [node]=\"node.children[question.key]\n            \"\n        [parentGroup]=\"node.control \"></form-renderer>\n    </div>\n  </div>\n\n</div>",
                    styles: ['../../style/app.css', DEFAULT_STYLES]
                }] }
    ];
    /** @nocollapse */
    FormRendererComponent.ctorParameters = function () { return [
        { type: ValidationFactory },
        { type: DataSources },
        { type: FormErrorsService },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    FormRendererComponent.propDecorators = {
        parentComponent: [{ type: Input }],
        node: [{ type: Input }],
        parentGroup: [{ type: Input }]
    };
    return FormRendererComponent;
}());
export { FormRendererComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1yZW5kZXJlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tcmVuZGVyZXIvZm9ybS1yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFDakMsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxVQUFVLENBQUM7QUFDbEIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUNoRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUV2RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVwRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBYyxPQUFPLEVBQW1CLE1BQU0sTUFBTSxDQUFDO0FBR3hFLE9BQU8sRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQU8sTUFBTSxnQkFBZ0IsQ0FBQztBQUVyRztJQXNCRSwrQkFDVSxpQkFBb0MsRUFDcEMsV0FBd0IsRUFDeEIsaUJBQW9DLEVBQ2xCLFFBQWE7UUFIL0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ2xCLGFBQVEsR0FBUixRQUFRLENBQUs7UUFo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K0I7O0lBQy9CLDRDQUEwQzs7SUFDMUMsZ0RBQXFEOztJQUNyRCx5Q0FBeUI7O0lBQ3pCLDBDQUEwQjs7SUFDMUIsMENBQXlCOztJQUN6QiwyQ0FBOEI7O0lBQzlCLDRDQUEyQjs7SUFDM0IscUNBQWlCOztJQUVqQiwyQ0FBOEI7O0lBQzlCLGlEQUF5Qjs7SUFDekIsZ0RBQXdDOzs7OztJQUd0QyxrREFBNEM7Ozs7O0lBQzVDLDRDQUFnQzs7Ozs7SUFDaEMsa0RBQTRDOzs7OztJQUM1Qyx5Q0FBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEluamVjdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAnaGFtbWVyanMnO1xuaW1wb3J0IHsgREVGQVVMVF9TVFlMRVMgfSBmcm9tICcuL2Zvcm0tcmVuZGVyZXIuY29tcG9uZW50LmNzcyc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEYXRhU291cmNlcyB9IGZyb20gJy4uL2RhdGEtc291cmNlcy9kYXRhLXNvdXJjZXMnO1xuaW1wb3J0IHsgTm9kZUJhc2UsIExlYWZOb2RlIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0tbm9kZSc7XG5pbXBvcnQgeyBBZmVGb3JtR3JvdXAgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tZ3JvdXAnO1xuaW1wb3J0IHsgVmFsaWRhdGlvbkZhY3RvcnkgfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvdmFsaWRhdGlvbi5mYWN0b3J5JztcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9kYXRhLXNvdXJjZSc7XG5pbXBvcnQgeyBGb3JtRXJyb3JzU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2Zvcm0tZXJyb3JzLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVlc3Rpb25Hcm91cCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9ncm91cC1xdWVzdGlvbic7XG5pbXBvcnQgeyBjb25jYXQsIG9mLCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgdGFwLCBzd2l0Y2hNYXAsIGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZm9ybS1yZW5kZXJlcicsXG4gIHRlbXBsYXRlVXJsOiAnZm9ybS1yZW5kZXJlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlczogWycuLi8uLi9zdHlsZS9hcHAuY3NzJywgREVGQVVMVF9TVFlMRVNdXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1SZW5kZXJlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgcHVibGljIHBhcmVudENvbXBvbmVudDogRm9ybVJlbmRlcmVyQ29tcG9uZW50O1xuICBASW5wdXQoKSBwdWJsaWMgbm9kZTogTm9kZUJhc2U7XG4gIEBJbnB1dCgpIHB1YmxpYyBwYXJlbnRHcm91cDogQWZlRm9ybUdyb3VwO1xuICBwdWJsaWMgY2hpbGRDb21wb25lbnRzOiBGb3JtUmVuZGVyZXJDb21wb25lbnRbXSA9IFtdO1xuICBwdWJsaWMgc2hvd1RpbWU6IGJvb2xlYW47XG4gIHB1YmxpYyBzaG93V2Vla3M6IGJvb2xlYW47XG4gIHB1YmxpYyBhY3RpdmVUYWI6IG51bWJlcjtcbiAgcHVibGljIGRhdGFTb3VyY2U6IERhdGFTb3VyY2U7XG4gIHB1YmxpYyBpc0NvbGxhcHNlZCA9IGZhbHNlO1xuICBwdWJsaWMgYXV0bzogYW55O1xuXG4gIGxvY2F0aW9ucyQ6IE9ic2VydmFibGU8YW55W10+O1xuICBsb2NhdGlvbnNMb2FkaW5nID0gZmFsc2U7XG4gIGxvY2F0aW9uc0lucHV0JCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHZhbGlkYXRpb25GYWN0b3J5OiBWYWxpZGF0aW9uRmFjdG9yeSxcbiAgICBwcml2YXRlIGRhdGFTb3VyY2VzOiBEYXRhU291cmNlcyxcbiAgICBwcml2YXRlIGZvcm1FcnJvcnNTZXJ2aWNlOiBGb3JtRXJyb3JzU2VydmljZSxcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnkpIHtcbiAgICB0aGlzLmFjdGl2ZVRhYiA9IDA7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zZXRVcFJlbW90ZVNlbGVjdCgpO1xuICAgIHRoaXMuc2V0VXBGaWxlVXBsb2FkKCk7XG4gICAgaWYgKHRoaXMubm9kZSAmJiB0aGlzLm5vZGUuZm9ybSkge1xuICAgICAgY29uc3QgdGFiID0gdGhpcy5ub2RlLmZvcm0udmFsdWVQcm9jZXNzaW5nSW5mby5sYXN0Rm9ybVRhYjtcbiAgICAgIGlmICh0YWIgJiYgdGFiICE9PSB0aGlzLmFjdGl2ZVRhYikge1xuICAgICAgICB0aGlzLmFjdGl2ZVRhYiA9IHRhYjtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMubm9kZSAmJiB0aGlzLm5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ2Zvcm0nKSB7XG4gICAgICB0aGlzLmZvcm1FcnJvcnNTZXJ2aWNlLmFubm91bmNlRXJyb3JGaWVsZCQuc3Vic2NyaWJlKFxuICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICB0aGlzLnNjcm9sbFRvQ29udHJvbChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdzZWN0aW9uJykge1xuICAgICAgdGhpcy5pc0NvbGxhcHNlZCA9ICEodGhpcy5ub2RlLnF1ZXN0aW9uIGFzIFF1ZXN0aW9uR3JvdXApLmlzRXhwYW5kZWQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGFyZW50Q29tcG9uZW50KSB7XG4gICAgICB0aGlzLnBhcmVudENvbXBvbmVudC5hZGRDaGlsZENvbXBvbmVudCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkQ2hpbGRDb21wb25lbnQoY2hpbGQ6IEZvcm1SZW5kZXJlckNvbXBvbmVudCkge1xuICAgIHRoaXMuY2hpbGRDb21wb25lbnRzLnB1c2goY2hpbGQpO1xuICB9XG5cbiAgcHVibGljIHNldFVwUmVtb3RlU2VsZWN0KCkge1xuICAgIGlmICh0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLnF1ZXN0aW9uLmV4dHJhcyAmJlxuICAgICAgdGhpcy5ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdyZW1vdGUtc2VsZWN0Jykge1xuICAgICAgbGV0IHNlbGVjdFF1ZXN0aW9uID0gdGhpcy5ub2RlLmZvcm0uc2VhcmNoTm9kZUJ5UXVlc3Rpb25JZCh0aGlzLm5vZGUucXVlc3Rpb24ua2V5KVswXTtcbiAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IHRoaXMuZGF0YVNvdXJjZXMuZGF0YVNvdXJjZXNbdGhpcy5ub2RlLnF1ZXN0aW9uLmRhdGFTb3VyY2VdO1xuICAgICAgbGV0IGRlZmFsdFZhbHVlcyA9IG9mKFtdKTtcbiAgICAgIGlmICh0aGlzLmRhdGFTb3VyY2UucmVzb2x2ZVNlbGVjdGVkVmFsdWUoc2VsZWN0UXVlc3Rpb24uY29udHJvbC52YWx1ZSkpIHtcbiAgICAgICAgZGVmYWx0VmFsdWVzID0gdGhpcy5kYXRhU291cmNlLnJlc29sdmVTZWxlY3RlZFZhbHVlKHNlbGVjdFF1ZXN0aW9uLmNvbnRyb2wudmFsdWUpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmxvY2F0aW9ucyQgPSBjb25jYXQoXG4gICAgICAgIGRlZmFsdFZhbHVlcyxcbiAgICAgICAgdGhpcy5sb2NhdGlvbnNJbnB1dCQucGlwZShcbiAgICAgICAgICBkZWJvdW5jZVRpbWUoMjAwKSxcbiAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgICAgIHRhcCgoKSA9PiB0aGlzLmxvY2F0aW9uc0xvYWRpbmcgPSB0cnVlKSxcbiAgICAgICAgICBzd2l0Y2hNYXAodGVybSA9PiB0aGlzLmRhdGFTb3VyY2Uuc2VhcmNoT3B0aW9ucyh0ZXJtKS5waXBlKFxuICAgICAgICAgICAgY2F0Y2hFcnJvcigoKSA9PiBvZihbXSkpLCAvLyBlbXB0eSBsaXN0IG9uIGVycm9yXG4gICAgICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmxvY2F0aW9uc0xvYWRpbmcgPSBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApKVxuICAgICAgICApXG4gICAgICApO1xuICAgICAgaWYgKHRoaXMuZGF0YVNvdXJjZSAmJiB0aGlzLm5vZGUucXVlc3Rpb24uZGF0YVNvdXJjZU9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5kYXRhU291cmNlLmRhdGFTb3VyY2VPcHRpb25zID0gdGhpcy5ub2RlLnF1ZXN0aW9uLmRhdGFTb3VyY2VPcHRpb25zO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXRVcEZpbGVVcGxvYWQoKSB7XG4gICAgaWYgKHRoaXMubm9kZSAmJiB0aGlzLm5vZGUucXVlc3Rpb24uZXh0cmFzICYmIHRoaXMubm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnZmlsZScpIHtcbiAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IHRoaXMuZGF0YVNvdXJjZXMuZGF0YVNvdXJjZXNbdGhpcy5ub2RlLnF1ZXN0aW9uLmRhdGFTb3VyY2VdO1xuICAgICAgLy8gY29uc29sZS5sb2coJ0tleScsIHRoaXMubm9kZS5xdWVzdGlvbik7XG4gICAgICAvLyBjb25zb2xlLmxvZygnRGF0YSBzb3VyY2UnLCB0aGlzLmRhdGFTb3VyY2UpO1xuICAgIH1cblxuICB9XG5cblxuICBwdWJsaWMgY2xpY2tUYWIodGFiTnVtYmVyKSB7XG4gICAgdGhpcy5hY3RpdmVUYWIgPSB0YWJOdW1iZXI7XG4gIH1cblxuICBwdWJsaWMgbG9hZFByZXZpb3VzVGFiKCkge1xuICAgIGlmICghdGhpcy5pc0N1cnJlbnRUYWJGaXJzdCgpKSB7XG4gICAgICB0aGlzLmNsaWNrVGFiKHRoaXMuYWN0aXZlVGFiIC0gMSk7XG4gICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IDA7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGlzQ3VycmVudFRhYkZpcnN0KCkge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZVRhYiA9PT0gMDtcbiAgfVxuXG4gIHB1YmxpYyBpc0N1cnJlbnRUYWJMYXN0KCkge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZVRhYiA9PT0gdGhpcy5ub2RlLnF1ZXN0aW9uWydxdWVzdGlvbnMnXS5sZW5ndGggLSAxO1xuICB9XG5cbiAgcHVibGljIGxvYWROZXh0VGFiKCkge1xuICAgIGlmICghdGhpcy5pc0N1cnJlbnRUYWJMYXN0KCkpIHtcbiAgICAgIHRoaXMuY2xpY2tUYWIodGhpcy5hY3RpdmVUYWIgKyAxKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gMDtcbiAgICB9XG4gIH1cbiAgcHVibGljIHRhYlNlbGVjdGVkKCRldmVudCkge1xuICAgIHRoaXMuYWN0aXZlVGFiID0gJGV2ZW50LmluZGV4O1xuICAgIHRoaXMuc2V0UHJldmlvdXNUYWIoKTtcbiAgfVxuICBwdWJsaWMgc2V0UHJldmlvdXNUYWIoKSB7XG4gICAgaWYgKHRoaXMubm9kZSAmJiB0aGlzLm5vZGUuZm9ybSkge1xuICAgICAgdGhpcy5ub2RlLmZvcm0udmFsdWVQcm9jZXNzaW5nSW5mb1snbGFzdEZvcm1UYWInXSA9IHRoaXMuYWN0aXZlVGFiO1xuICAgIH1cblxuICB9XG4gIHB1YmxpYyBoYXNFcnJvcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMubm9kZS5jb250cm9sLnRvdWNoZWQgJiYgIXRoaXMubm9kZS5jb250cm9sLnZhbGlkO1xuICB9XG5cbiAgcHVibGljIGVycm9ycygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFcnJvcnModGhpcy5ub2RlKTtcbiAgfVxuXG5cbiAgcHVibGljIHNjcm9sbFRvQ29udHJvbChlcnJvcjogc3RyaW5nKSB7XG5cbiAgICBjb25zdCB0YWI6IG51bWJlciA9ICtlcnJvci5zcGxpdCgnLCcpWzBdO1xuICAgIGNvbnN0IGVsU2VsZWN0b3IgPSBlcnJvci5zcGxpdCgnLCcpWzFdICsgJ2lkJztcblxuICAgIC8vIHRoZSB0YWIgY29tcG9uZW50c1xuICAgIGNvbnN0IHRhYkNvbXBvbmVudDogRm9ybVJlbmRlcmVyQ29tcG9uZW50ID0gdGhpcy5jaGlsZENvbXBvbmVudHNbdGFiXTtcblxuICAgIHRoaXMuY2xpY2tUYWIodGFiKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICAvLyBleHBhbmQgYWxsIHNlY3Rpb25zXG4gICAgICB0YWJDb21wb25lbnQuY2hpbGRDb21wb25lbnRzLmZvckVhY2goKHNlY3Rpb24pID0+IHtcbiAgICAgICAgc2VjdGlvbi5pc0NvbGxhcHNlZCA9IGZhbHNlO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGVsZW1lbnQ6IGFueSA9IHRoaXMuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxTZWxlY3Rvcik7XG4gICAgICAgICAgaWYgKGVsZW1lbnQgIT09IG51bGwgJiYgZWxlbWVudC5mb2N1cykge1xuICAgICAgICAgICAgZWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgZWxlbWVudC5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiAnc21vb3RoJywgYmxvY2s6ICdjZW50ZXInIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwKTtcbiAgICAgIH0pO1xuXG4gICAgfSwgMjAwKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkRhdGVDaGFuZ2VkKG5vZGU6IExlYWZOb2RlKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ05vZGUnLCBub2RlKTtcbiAgICB0aGlzLm5vZGUgPSBub2RlO1xuICB9XG5cbiAgcHVibGljIHVwbG9hZChldmVudCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdFdmVudCcsIGV2ZW50KTtcbiAgICAvLyBjb25zb2xlLmxvZygnRGF0YScsIHRoaXMuZGF0YVNvdXJjZSk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlSW5mb3JtYXRpb24oaW5mb0lkKSB7XG4gICAgY29uc3QgZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGluZm9JZCk7XG5cbiAgICBpZiAoZS5zdHlsZS5kaXNwbGF5ID09PSAnYmxvY2snKSB7XG4gICAgICBlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfVxuXG5cbiAgICBjb25zb2xlLmxvZygnSW5mb0lkJywgaW5mb0lkKTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBnZXRFcnJvcnMobm9kZTogTm9kZUJhc2UpIHtcbiAgICBjb25zdCBlcnJvcnM6IGFueSA9IG5vZGUuY29udHJvbC5lcnJvcnM7XG5cbiAgICBpZiAoZXJyb3JzKSB7XG5cbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRpb25GYWN0b3J5LmVycm9ycyhlcnJvcnMsIG5vZGUucXVlc3Rpb24pO1xuICAgIH1cblxuICAgIHJldHVybiBbXTtcbiAgfVxufVxuIl19