/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as _ from 'lodash';
import { TextInputQuestion } from '../question-models/text-input-question';
import { TextAreaInputQuestion } from '../question-models/text-area-input-question';
import { SelectQuestion } from '../question-models/select-question';
import { UiSelectQuestion } from '../question-models/ui-select-question';
import { DateQuestion } from '../question-models/date-question';
import { MultiSelectQuestion } from '../question-models/multi-select-question';
import { QuestionGroup } from '../question-models/group-question';
import { RepeatingQuestion } from '../question-models/repeating-question';
import { FileUploadQuestion } from '../question-models/file-upload-question';
import { TestOrderQuestion } from '../question-models/test-order-question';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
import { ValidationModel } from '../question-models/validation.model';
import { DateValidationModel } from '../question-models/date-validation.model';
import { MaxValidationModel } from '../question-models/max-validation.model';
import { MinValidationModel } from '../question-models/min-validation.model';
import { JsExpressionValidationModel } from '../question-models/js-expression-validation.model';
import { ConditionalValidationModel } from '../question-models/conditional-validation.model';
import { DummyDataSource } from '../data-sources/dummy-data-source';
import { HistoricalHelperService } from '../helpers/historical-expression-helper-service';
import { CheckBoxQuestion } from '../question-models/models';
var QuestionFactory = /** @class */ (function () {
    function QuestionFactory() {
        this.dataSources = {};
        this.historicalHelperService = new HistoricalHelperService();
    }
    /**
     * @param {?} formSchema
     * @param {?=} form
     * @return {?}
     */
    QuestionFactory.prototype.createQuestionModel = /**
     * @param {?} formSchema
     * @param {?=} form
     * @return {?}
     */
    function (formSchema, form) {
        if (form) {
            /** @type {?} */
            var dataSources = form.dataSourcesContainer.dataSources;
            this.dataSources = dataSources;
        }
        return this.toFormQuestionModel(formSchema);
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toSelectQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        /** @type {?} */
        var question = new SelectQuestion({ options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.options = schemaQuestion.questionOptions.answers.map(function (obj) {
            return {
                label: obj.label,
                value: obj.concept
            };
        });
        /** @type {?} */
        var options = question.options;
        options.splice(0, 0, {
            label: '',
            value: ''
        });
        question.renderingType = schemaQuestion.questionOptions.rendering;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        /** @type {?} */
        var mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toNumericQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        /** @type {?} */
        var question = new TextInputQuestion({ placeholder: '', type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'number';
        question.placeholder = schemaQuestion.questionOptions.placeholder;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.placeholder = schemaQuestion.questionOptions.placeholder || '';
        /** @type {?} */
        var mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toNumberQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        /** @type {?} */
        var question = new TextInputQuestion({ placeholder: '', type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'number';
        question.placeholder = schemaQuestion.questionOptions.placeholder || '';
        question.extras = schemaQuestion;
        /** @type {?} */
        var mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        question.validators = this.addValidators(schemaQuestion);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toDateQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        if (schemaQuestion.type === 'encounterDatetime') {
            return this.toEncounterDatetimeQuestion(schemaQuestion);
        }
        /** @type {?} */
        var question = new DateQuestion({ type: '', key: '' });
        question.renderingType = 'date';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.showTime = (/** @type {?} */ (schemaQuestion.questionOptions.showTime));
        question.showWeeksAdder = schemaQuestion.questionOptions.weeksList ? true : false;
        /** @type {?} */
        var mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toEncounterDatetimeQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        /** @type {?} */
        var question = new DateQuestion({ type: '', key: '' });
        question.label = schemaQuestion.label;
        question.renderingType = 'date';
        question.key = schemaQuestion.id;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.showWeeksAdder = schemaQuestion.questionOptions.weeksList ? true : false;
        /** @type {?} */
        var mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        question.showTime = true;
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toCheckBoxQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        /** @type {?} */
        var question = new CheckBoxQuestion({ options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.extras = schemaQuestion;
        question.options = schemaQuestion.questionOptions.answers.map(function (obj) {
            return {
                label: obj.label,
                value: obj.concept
            };
        });
        question.options.splice(0, 0);
        question.renderingType = schemaQuestion.questionOptions.rendering;
        /** @type {?} */
        var mappings = {
            label: 'label',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toMultiCheckboxQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        /** @type {?} */
        var question = new MultiSelectQuestion({ renderType: '', options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.options = schemaQuestion.questionOptions.answers.map(function (obj) {
            return {
                label: obj.label,
                value: obj.concept
            };
        });
        question.validators = this.addValidators(schemaQuestion);
        question.dataSource = new DummyDataSource();
        question.extras = schemaQuestion;
        /** @type {?} */
        var mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toTextAreaQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        /** @type {?} */
        var question = new TextAreaInputQuestion({
            isExpanded: false, rows: 18,
            placeholder: '', type: '', key: ''
        });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.placeholder = schemaQuestion.questionOptions.placeholder;
        question.isExpanded = schemaQuestion.isExpanded;
        question.rows = schemaQuestion.questionOptions.rows;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.placeholder = schemaQuestion.questionOptions.placeholder || '';
        /** @type {?} */
        var mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toTextQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        /** @type {?} */
        var question = new TextInputQuestion({ placeholder: '', type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'text';
        question.placeholder = schemaQuestion.questionOptions.placeholder;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.placeholder = schemaQuestion.questionOptions.placeholder || '';
        /** @type {?} */
        var mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toFileUploadQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        /** @type {?} */
        var question = new FileUploadQuestion({ type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'file';
        question.dataSource = 'file';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        /** @type {?} */
        var mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toDrugQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        /** @type {?} */
        var question = new SelectQuestion({ options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = 'drug';
        /** @type {?} */
        var mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toProblemQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        /** @type {?} */
        var question = new SelectQuestion({ options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = 'problem';
        /** @type {?} */
        var mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toConceptAnswerSelect = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        /** @type {?} */
        var question = new SelectQuestion({ options: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = schemaQuestion.questionOptions.dataSource || 'conceptAnswers';
        question.dataSourceOptions = {
            concept: schemaQuestion.questionOptions.concept
        };
        /** @type {?} */
        var mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toRepeatingQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        /** @type {?} */
        var question = new RepeatingQuestion({ questions: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.questions = this.getChildrenQuestionModels(schemaQuestion.questions);
        question.key = schemaQuestion.id;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        if (schemaQuestion.type === 'testOrder') {
            /** @type {?} */
            var testOrder = this.toTestOrderQuestion(schemaQuestion);
            /** @type {?} */
            var orders = [];
            orders.push(testOrder);
            question.questions = orders;
        }
        /** @type {?} */
        var mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toGroupQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        /** @type {?} */
        var question = new QuestionGroup({ questions: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.questions = this.getChildrenQuestionModels(schemaQuestion.questions);
        question.key = schemaQuestion.id;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        /** @type {?} */
        var mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toPageQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var _this = this;
        /** @type {?} */
        var question = new QuestionGroup({ questions: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.label;
        question.renderingType = 'page';
        question.controlType = AfeControlType.None;
        question.questions = [];
        schemaQuestion.sections.forEach(function (element) {
            question.questions.push(_this.toSectionQuestion(element));
        });
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toFormQuestionModel = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        var _this = this;
        /** @type {?} */
        var question = new QuestionGroup({ questions: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.label;
        question.renderingType = 'form';
        question.controlType = AfeControlType.AfeFormGroup;
        question.extras = schemaQuestion;
        question.questions = [];
        schemaQuestion.pages.forEach(function (element) {
            question.questions.push(_this.toPageQuestion(element));
        });
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toSectionQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        /** @type {?} */
        var question = new QuestionGroup({ questions: [], type: '', key: '' });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.label;
        question.renderingType = 'section';
        question.controlType = AfeControlType.None;
        question.isExpanded = schemaQuestion.isExpanded === 'true' ? true : false;
        question.questions = this.getSchemaQuestions(schemaQuestion.questions);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toPersonAttributeQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        /** @type {?} */
        var question = new UiSelectQuestion({
            options: [], type: '', key: '', searchFunction: function () { },
            resolveFunction: function () {
            }
        });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = 'personAttribute';
        /** @type {?} */
        var mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toEncounterProviderQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        /** @type {?} */
        var question = new UiSelectQuestion({
            options: [], type: '', key: '', searchFunction: function () { },
            resolveFunction: function () {
            }
        });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = 'provider';
        /** @type {?} */
        var mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toFieldSetQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        /** @type {?} */
        var toReturn = this.toGroupQuestion(schemaQuestion);
        toReturn.renderingType = 'field-set';
        return toReturn;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toEncounterLocationQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        /** @type {?} */
        var question = new UiSelectQuestion({
            options: [], type: '', key: '', searchFunction: function () { },
            resolveFunction: function () {
            }
        });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.renderingType = schemaQuestion.type;
        question.renderingType = 'remote-select';
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.dataSource = 'location';
        /** @type {?} */
        var mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        this.addDisableOrHideProperty(schemaQuestion, question);
        this.addAlertProperty(schemaQuestion, question);
        this.addHistoricalExpressions(schemaQuestion, question);
        this.addCalculatorProperty(schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.toTestOrderQuestion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        /** @type {?} */
        var question = new TestOrderQuestion({
            type: '', key: '', orderType: '', selectableOrders: [],
            orderSettingUuid: '', label: '', rendering: ''
        });
        question.label = schemaQuestion.label;
        question.key = schemaQuestion.id;
        question.validators = this.addValidators(schemaQuestion);
        question.extras = schemaQuestion;
        question.options = schemaQuestion.questionOptions.selectableOrders.map(function (obj) {
            return {
                label: obj.label,
                value: obj.concept
            };
        });
        /** @type {?} */
        var mappings = {
            label: 'label',
            required: 'required',
            id: 'key'
        };
        this.copyProperties(mappings, schemaQuestion, question);
        return question;
    };
    /**
     * @param {?} schema
     * @return {?}
     */
    QuestionFactory.prototype.getSchemaQuestions = /**
     * @param {?} schema
     * @return {?}
     */
    function (schema) {
        /** @type {?} */
        var listQuestions = new Array();
        this.getQuestions(schema, listQuestions);
        return listQuestions;
    };
    /**
     * @param {?} schema
     * @param {?} foundArray
     * @return {?}
     */
    QuestionFactory.prototype.getQuestions = /**
     * @param {?} schema
     * @param {?} foundArray
     * @return {?}
     */
    function (schema, foundArray) {
        if (!Array.isArray(foundArray)) {
            foundArray = [];
        }
        if (Array.isArray(schema)) {
            for (var property in schema) {
                if (schema.hasOwnProperty(property)) {
                    this.getQuestions(schema[property], foundArray);
                }
            }
        }
        if (schema && !Array.isArray(schema) && typeof schema === 'object') {
            if (schema.questionOptions) {
                if (schema.questionOptions.rendering === 'group' ||
                    schema.questionOptions.rendering === 'repeating') {
                    // schema.questions = this.getGroupMembers(schema.questions);
                    foundArray.push(this.toModel(schema, schema.questionOptions.rendering));
                }
                else if (schema.questionOptions.rendering === 'field-set') {
                }
                else {
                    foundArray.push(this.toModel(schema, schema.questionOptions.rendering));
                }
            }
            else {
                for (var o in schema) {
                    if (schema.hasOwnProperty(o)) {
                        this.getQuestions(schema[o], foundArray);
                    }
                }
            }
        }
    };
    /**
     * @param {?} schema
     * @return {?}
     */
    QuestionFactory.prototype.getChildrenQuestionModels = /**
     * @param {?} schema
     * @return {?}
     */
    function (schema) {
        /** @type {?} */
        var children = [];
        this.getQuestions(schema, children);
        return children;
    };
    /**
     * @param {?} schema
     * @param {?} renderType
     * @return {?}
     */
    QuestionFactory.prototype.toModel = /**
     * @param {?} schema
     * @param {?} renderType
     * @return {?}
     */
    function (schema, renderType) {
        if (renderType === 'ui-select-extended') {
            renderType = schema.type;
        }
        if (!schema.id) {
            schema['id'] = this.generateId(10);
        }
        if (schema.questionOptions &&
            (schema.questionOptions.showDate === true ||
                schema.questionOptions.showDate === 'true')) {
            schema = this.convertOldVersionComplexObsQuestionToNewVersion(schema);
            renderType = 'field-set';
        }
        switch (renderType) {
            case 'select':
                return this.toSelectQuestion(schema);
            case 'single-select':
                return this.toSelectQuestion(schema);
            case 'multi-select':
                return this.toSelectQuestion(schema);
            case 'numeric':
                return this.toNumericQuestion(schema);
            case 'number':
                return this.toNumberQuestion(schema);
            case 'encounterDatetime':
                return this.toEncounterDatetimeQuestion(schema);
            case 'date':
                return this.toDateQuestion(schema);
            case 'multiCheckbox':
                return this.toMultiCheckboxQuestion(schema);
            case 'drug':
                return this.toDrugQuestion(schema);
            case 'problem':
                return this.toProblemQuestion(schema);
            case 'group':
                return this.toGroupQuestion(schema);
            case 'field-set':
                return this.toFieldSetQuestion(schema);
            case 'repeating':
                return this.toRepeatingQuestion(schema);
            case 'personAttribute':
                return this.toPersonAttributeQuestion(schema);
            case 'text':
                return this.toTextQuestion(schema);
            case 'textarea':
                return this.toTextAreaQuestion(schema);
            case 'textarea':
                return this.toTextAreaQuestion(schema);
            case 'select-concept-answers':
                return this.toConceptAnswerSelect(schema);
            case 'encounterLocation':
                return this.toEncounterLocationQuestion(schema);
            case 'encounterDatetime':
                return this.toEncounterDatetimeQuestion(schema);
            case 'encounterProvider':
                return this.toEncounterProviderQuestion(schema);
            case 'radio':
                return this.toCheckBoxQuestion(schema);
            case 'checkbox':
                return this.toCheckBoxQuestion(schema);
            case 'encounterProvider':
                return this.toEncounterProviderQuestion(schema);
            case 'file':
                return this.toFileUploadQuestion(schema);
            default:
                console.warn('New Schema Question Type found.........' + renderType);
                return this.toTextQuestion(schema);
        }
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.convertOldVersionComplexObsQuestionToNewVersion = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        /** @type {?} */
        var converted = {};
        converted.type = 'complex-obs';
        converted.label = schemaQuestion.label;
        converted.id = 'complex_' + schemaQuestion.id;
        converted.questionOptions = {};
        converted.questionOptions.concept = schemaQuestion.questionOptions.concept;
        converted.questionOptions.rendering = 'field-set';
        converted.questions = [];
        converted.validators = [];
        /** @type {?} */
        var mainField = JSON.parse(JSON.stringify(schemaQuestion));
        mainField.type = 'complex-obs-child';
        delete mainField.questionOptions.showDate;
        delete mainField.questionOptions.shownDateOptions;
        mainField.questionOptions.obsField = 'value';
        /** @type {?} */
        var dateField = {};
        dateField.type = 'complex-obs-child';
        dateField.label = 'Date of ' + mainField.label;
        dateField.id = 'date_' + mainField.id;
        dateField.questionOptions = {};
        dateField.questionOptions.concept = schemaQuestion.questionOptions.concept;
        dateField.questionOptions.rendering = 'date';
        dateField.questionOptions.obsField = 'obsDatetime';
        /** @type {?} */
        var dateOptions = ((/** @type {?} */ (Object))).assign({}, schemaQuestion.questionOptions.shownDateOptions);
        dateField.validators = dateOptions.validators;
        dateField.hide = dateOptions.hide;
        converted.questions.push(mainField);
        converted.questions.push(dateField);
        return converted;
    };
    /**
     * @param {?} mappings
     * @param {?} source
     * @param {?} destination
     * @return {?}
     */
    QuestionFactory.prototype.copyProperties = /**
     * @param {?} mappings
     * @param {?} source
     * @param {?} destination
     * @return {?}
     */
    function (mappings, source, destination) {
        for (var property in source) {
            if (mappings.hasOwnProperty(property) && destination.hasOwnProperty(mappings[property])) {
                destination[mappings[property]] = source[property];
            }
        }
    };
    /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    QuestionFactory.prototype.addValidators = /**
     * @param {?} schemaQuestion
     * @return {?}
     */
    function (schemaQuestion) {
        /** @type {?} */
        var validators = [];
        if (schemaQuestion.validators) {
            // TODO - add more validator types
            _.forEach(schemaQuestion.validators, function (validator) {
                switch (validator.type) {
                    case 'date':
                        validators.push(new DateValidationModel(validator));
                        break;
                    case 'js_expression':
                        validators.push(new JsExpressionValidationModel(validator));
                        break;
                    case 'conditionalAnswered':
                        validators.push(new ConditionalValidationModel(validator));
                        break;
                    default:
                        validators.push(new ValidationModel(validator));
                        break;
                }
            });
        }
        /** @type {?} */
        var questionOptions = schemaQuestion.questionOptions;
        /** @type {?} */
        var renderingType = questionOptions ? questionOptions.rendering : '';
        switch (renderingType) {
            case 'number':
                if (questionOptions.max && questionOptions.min) {
                    validators.push(new MaxValidationModel({
                        type: 'max',
                        max: questionOptions.max
                    }));
                    validators.push(new MinValidationModel({
                        type: 'min',
                        min: questionOptions.min
                    }));
                }
                break;
            default:
                break;
        }
        // add conditional required validators
        if (typeof schemaQuestion.required === 'object') {
            /** @type {?} */
            var required = schemaQuestion.required;
            if (required.type === 'conditionalRequired') {
                validators.push(new ConditionalValidationModel({
                    referenceQuestionId: required.referenceQuestionId,
                    referenceQuestionAnswers: required.referenceQuestionAnswers,
                    type: required.type,
                    message: required.message,
                }));
            }
        }
        return validators;
    };
    /**
     * @param {?} schemaQuestion
     * @param {?} question
     * @return {?}
     */
    QuestionFactory.prototype.addHistoricalExpressions = /**
     * @param {?} schemaQuestion
     * @param {?} question
     * @return {?}
     */
    function (schemaQuestion, question) {
        if (schemaQuestion.historicalExpression && schemaQuestion.historicalExpression.length > 0) {
            question.setHistoricalValue(true);
            if (schemaQuestion.showHistoricalEncounterDate !== undefined) {
                question.showHistoricalEncounterDate((schemaQuestion.showHistoricalEncounterDate === 'true'));
            }
            else {
                question.showHistoricalEncounterDate();
            }
            /** @type {?} */
            var origValue = this.historicalHelperService.evaluate(schemaQuestion.historicalExpression, this.dataSources);
            question.historicalDataValue = origValue;
            if (schemaQuestion.historicalPrepopulate) {
                question.defaultValue = origValue;
            }
        }
    };
    /**
     * @param {?} schemaQuestion
     * @param {?} question
     * @return {?}
     */
    QuestionFactory.prototype.addCalculatorProperty = /**
     * @param {?} schemaQuestion
     * @param {?} question
     * @return {?}
     */
    function (schemaQuestion, question) {
        if (schemaQuestion.questionOptions &&
            typeof schemaQuestion.questionOptions.calculate === 'object') {
            question.calculateExpression = schemaQuestion.questionOptions.calculate.calculateExpression;
        }
    };
    /**
     * @param {?} schemaQuestion
     * @param {?} question
     * @return {?}
     */
    QuestionFactory.prototype.addAlertProperty = /**
     * @param {?} schemaQuestion
     * @param {?} question
     * @return {?}
     */
    function (schemaQuestion, question) {
        if (schemaQuestion.alert) {
            question.alert = schemaQuestion.alert;
        }
        // if (typeof schemaQuestion.message === 'object') {
        //   if (schemaQuestion.message.alertWhenExpression) {
        //     question.message = schemaQuestion.message.alertWhenExpression;
        //   }
        // }
    };
    /**
     * @param {?} schemaQuestion
     * @param {?} question
     * @return {?}
     */
    QuestionFactory.prototype.addDisableOrHideProperty = /**
     * @param {?} schemaQuestion
     * @param {?} question
     * @return {?}
     */
    function (schemaQuestion, question) {
        if (!!schemaQuestion.disable) {
            question.disable = schemaQuestion.disable;
        }
        if (typeof schemaQuestion.disable === 'object') {
            question.disable = schemaQuestion.disable.disableWhenExpression;
        }
        if (!!schemaQuestion.hide) {
            question.hide = schemaQuestion.hide;
        }
        if (typeof schemaQuestion.hide === 'object') {
            if (schemaQuestion.hide.hideWhenExpression) {
                question.hide = schemaQuestion.hide.hideWhenExpression;
            }
        }
    };
    /**
     * @private
     * @param {?} x
     * @return {?}
     */
    QuestionFactory.prototype.generateId = /**
     * @private
     * @param {?} x
     * @return {?}
     */
    function (x) {
        /** @type {?} */
        var s = '_';
        while (s.length < x && x > 0) {
            /** @type {?} */
            var r = Math.random();
            s += (r < 0.1 ? Math.floor(r * 100) :
                String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
        }
        return '_' + s;
    };
    return QuestionFactory;
}());
export { QuestionFactory };
if (false) {
    /** @type {?} */
    QuestionFactory.prototype.dataSources;
    /** @type {?} */
    QuestionFactory.prototype.historicalHelperService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24uZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvZm9ybS1mYWN0b3J5L3F1ZXN0aW9uLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRTVCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBRTFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUVwRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDdEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1B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a0IsQ0FBQzthQUN4RDtTQUNGO0lBQ0gsQ0FBQzs7Ozs7O0lBQ08sb0NBQVU7Ozs7O0lBQWxCLFVBQW1CLENBQUM7O1lBQ2QsQ0FBQyxHQUFHLEdBQUc7UUFDWCxPQUFPLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7O2dCQUN0QixDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUN2QixDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEU7UUFDRCxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQWwxQkQsSUFrMUJDOzs7O0lBajFCQyxzQ0FBc0I7O0lBQ3RCLGtEQUFpRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHsgVGV4dElucHV0UXVlc3Rpb24gfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvdGV4dC1pbnB1dC1xdWVzdGlvbic7XG5pbXBvcnQgeyBUZXh0QXJlYUlucHV0UXVlc3Rpb24gfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvdGV4dC1hcmVhLWlucHV0LXF1ZXN0aW9uJztcbmltcG9ydCB7IFNlbGVjdFF1ZXN0aW9uIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3NlbGVjdC1xdWVzdGlvbic7XG5pbXBvcnQgeyBVaVNlbGVjdFF1ZXN0aW9uIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3VpLXNlbGVjdC1xdWVzdGlvbic7XG5pbXBvcnQgeyBEYXRlUXVlc3Rpb24gfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvZGF0ZS1xdWVzdGlvbic7XG5pbXBvcnQgeyBNdWx0aVNlbGVjdFF1ZXN0aW9uIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL211bHRpLXNlbGVjdC1xdWVzdGlvbic7XG5pbXBvcnQgeyBRdWVzdGlvbkdyb3VwIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2dyb3VwLXF1ZXN0aW9uJztcbmltcG9ydCB7IFJlcGVhdGluZ1F1ZXN0aW9uIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3JlcGVhdGluZy1xdWVzdGlvbic7XG5pbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvcXVlc3Rpb24tYmFzZSc7XG5pbXBvcnQgeyBGaWxlVXBsb2FkUXVlc3Rpb24gfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvZmlsZS11cGxvYWQtcXVlc3Rpb24nO1xuaW1wb3J0IHsgVGVzdE9yZGVyUXVlc3Rpb24gfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvdGVzdC1vcmRlci1xdWVzdGlvbic7XG5pbXBvcnQgeyBBZmVDb250cm9sVHlwZSB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtY29udHJvbC10eXBlJztcblxuaW1wb3J0IHsgVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3ZhbGlkYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgRGF0ZVZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9kYXRlLXZhbGlkYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgTWF4VmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL21heC12YWxpZGF0aW9uLm1vZGVsJztcbmltcG9ydCB7IE1pblZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9taW4tdmFsaWRhdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBKc0V4cHJlc3Npb25WYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvanMtZXhwcmVzc2lvbi12YWxpZGF0aW9uLm1vZGVsJztcbmltcG9ydCB7IENvbmRpdGlvbmFsVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2NvbmRpdGlvbmFsLXZhbGlkYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgRHVtbXlEYXRhU291cmNlIH0gZnJvbSAnLi4vZGF0YS1zb3VyY2VzL2R1bW15LWRhdGEtc291cmNlJztcbmltcG9ydCB7IEhpc3RvcmljYWxIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vaGVscGVycy9oaXN0b3JpY2FsLWV4cHJlc3Npb24taGVscGVyLXNlcnZpY2UnO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4vZm9ybSc7XG5pbXBvcnQgeyBDaGVja0JveFF1ZXN0aW9uIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL21vZGVscyc7XG5cbmV4cG9ydCBjbGFzcyBRdWVzdGlvbkZhY3Rvcnkge1xuICBkYXRhU291cmNlczogYW55ID0ge307XG4gIGhpc3RvcmljYWxIZWxwZXJTZXJ2aWNlOiBIaXN0b3JpY2FsSGVscGVyU2VydmljZSA9IG5ldyBIaXN0b3JpY2FsSGVscGVyU2VydmljZSgpO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIGNyZWF0ZVF1ZXN0aW9uTW9kZWwoZm9ybVNjaGVtYTogYW55LCBmb3JtPzogRm9ybSk6IFF1ZXN0aW9uQmFzZSB7XG4gICAgaWYgKGZvcm0pIHtcbiAgICAgIGNvbnN0IGRhdGFTb3VyY2VzID0gZm9ybS5kYXRhU291cmNlc0NvbnRhaW5lci5kYXRhU291cmNlcztcbiAgICAgIHRoaXMuZGF0YVNvdXJjZXMgPSBkYXRhU291cmNlcztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudG9Gb3JtUXVlc3Rpb25Nb2RlbChmb3JtU2NoZW1hKTtcbiAgfVxuXG4gIHRvU2VsZWN0UXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFNlbGVjdFF1ZXN0aW9uIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBTZWxlY3RRdWVzdGlvbih7IG9wdGlvbnM6IFtdLCB0eXBlOiAnJywga2V5OiAnJyB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xuICAgIHF1ZXN0aW9uLm9wdGlvbnMgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuYW5zd2Vycy5tYXAoZnVuY3Rpb24gKG9iaikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGFiZWw6IG9iai5sYWJlbCxcbiAgICAgICAgdmFsdWU6IG9iai5jb25jZXB0XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgY29uc3Qgb3B0aW9uczogYW55ID0gcXVlc3Rpb24ub3B0aW9ucztcbiAgICBvcHRpb25zLnNwbGljZSgwLCAwLCB7XG4gICAgICBsYWJlbDogJycsXG4gICAgICB2YWx1ZTogJydcbiAgICB9KTtcblxuICAgIHF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nO1xuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuXG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICBpZDogJ2tleSdcbiAgICB9O1xuXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b051bWVyaWNRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogVGV4dElucHV0UXVlc3Rpb24ge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IFRleHRJbnB1dFF1ZXN0aW9uKHsgcGxhY2Vob2xkZXI6ICcnLCB0eXBlOiAnJywga2V5OiAnJyB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xuICAgIHF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPSAnbnVtYmVyJztcbiAgICBxdWVzdGlvbi5wbGFjZWhvbGRlciA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5wbGFjZWhvbGRlcjtcbiAgICBxdWVzdGlvbi52YWxpZGF0b3JzID0gdGhpcy5hZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICBxdWVzdGlvbi5leHRyYXMgPSBzY2hlbWFRdWVzdGlvbjtcbiAgICBxdWVzdGlvbi5wbGFjZWhvbGRlciA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5wbGFjZWhvbGRlciB8fCAnJztcbiAgICBjb25zdCBtYXBwaW5nczogYW55ID0ge1xuICAgICAgbGFiZWw6ICdsYWJlbCcsXG4gICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgIGlkOiAna2V5J1xuICAgIH07XG5cbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRBbGVydFByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRIaXN0b3JpY2FsRXhwcmVzc2lvbnMoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIHRvTnVtYmVyUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFRleHRJbnB1dFF1ZXN0aW9uIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBUZXh0SW5wdXRRdWVzdGlvbih7IHBsYWNlaG9sZGVyOiAnJywgdHlwZTogJycsIGtleTogJycgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gJ251bWJlcic7XG4gICAgcXVlc3Rpb24ucGxhY2Vob2xkZXIgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMucGxhY2Vob2xkZXIgfHwgJyc7XG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XG5cbiAgICBjb25zdCBtYXBwaW5nczogYW55ID0ge1xuICAgICAgbGFiZWw6ICdsYWJlbCcsXG4gICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgIGlkOiAna2V5J1xuICAgIH07XG5cbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRBbGVydFByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRIaXN0b3JpY2FsRXhwcmVzc2lvbnMoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIHRvRGF0ZVF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBEYXRlUXVlc3Rpb24ge1xuICAgIGlmIChzY2hlbWFRdWVzdGlvbi50eXBlID09PSAnZW5jb3VudGVyRGF0ZXRpbWUnKSB7XG4gICAgICByZXR1cm4gdGhpcy50b0VuY291bnRlckRhdGV0aW1lUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb24pO1xuICAgIH1cbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBEYXRlUXVlc3Rpb24oeyB0eXBlOiAnJywga2V5OiAnJyB9KTtcbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gJ2RhdGUnO1xuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuICAgIHF1ZXN0aW9uLnNob3dUaW1lID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnNob3dUaW1lIGFzIGJvb2xlYW47XG4gICAgcXVlc3Rpb24uc2hvd1dlZWtzQWRkZXIgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMud2Vla3NMaXN0ID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICBpZDogJ2tleSdcbiAgICB9O1xuXG5cbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRBbGVydFByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRIaXN0b3JpY2FsRXhwcmVzc2lvbnMoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIHRvRW5jb3VudGVyRGF0ZXRpbWVRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogRGF0ZVF1ZXN0aW9uIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBEYXRlUXVlc3Rpb24oeyB0eXBlOiAnJywga2V5OiAnJyB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPSAnZGF0ZSc7XG4gICAgcXVlc3Rpb24ua2V5ID0gc2NoZW1hUXVlc3Rpb24uaWQ7XG4gICAgcXVlc3Rpb24udmFsaWRhdG9ycyA9IHRoaXMuYWRkVmFsaWRhdG9ycyhzY2hlbWFRdWVzdGlvbik7XG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XG4gICAgcXVlc3Rpb24uc2hvd1dlZWtzQWRkZXIgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMud2Vla3NMaXN0ID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICBpZDogJ2tleSdcbiAgICB9O1xuICAgIHF1ZXN0aW9uLnNob3dUaW1lID0gdHJ1ZTtcblxuICAgIHRoaXMuY29weVByb3BlcnRpZXMobWFwcGluZ3MsIHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgdG9DaGVja0JveFF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBDaGVja0JveFF1ZXN0aW9uIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBDaGVja0JveFF1ZXN0aW9uKHsgb3B0aW9uczogW10sIHR5cGU6ICcnLCBrZXk6ICcnIH0pO1xuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XG4gICAgcXVlc3Rpb24ua2V5ID0gc2NoZW1hUXVlc3Rpb24uaWQ7XG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XG4gICAgcXVlc3Rpb24ub3B0aW9ucyA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5hbnN3ZXJzLm1hcCgob2JqKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsYWJlbDogb2JqLmxhYmVsLFxuICAgICAgICB2YWx1ZTogb2JqLmNvbmNlcHRcbiAgICAgIH07XG4gICAgfSk7XG4gICAgcXVlc3Rpb24ub3B0aW9ucy5zcGxpY2UoMCwgMCk7XG5cbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZztcbiAgICBjb25zdCBtYXBwaW5nczogYW55ID0ge1xuICAgICAgbGFiZWw6ICdsYWJlbCcsXG4gICAgICBpZDogJ2tleSdcbiAgICB9O1xuXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG5cbiAgfVxuXG4gIHRvTXVsdGlDaGVja2JveFF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBNdWx0aVNlbGVjdFF1ZXN0aW9uIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBNdWx0aVNlbGVjdFF1ZXN0aW9uKHsgcmVuZGVyVHlwZTogJycsIG9wdGlvbnM6IFtdLCB0eXBlOiAnJywga2V5OiAnJyB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xuICAgIHF1ZXN0aW9uLm9wdGlvbnMgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuYW5zd2Vycy5tYXAoZnVuY3Rpb24gKG9iaikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGFiZWw6IG9iai5sYWJlbCxcbiAgICAgICAgdmFsdWU6IG9iai5jb25jZXB0XG4gICAgICB9O1xuICAgIH0pO1xuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xuICAgIHF1ZXN0aW9uLmRhdGFTb3VyY2UgPSBuZXcgRHVtbXlEYXRhU291cmNlKCk7XG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XG5cbiAgICBjb25zdCBtYXBwaW5nczogYW55ID0ge1xuICAgICAgbGFiZWw6ICdsYWJlbCcsXG4gICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgIGlkOiAna2V5J1xuICAgIH07XG5cbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRBbGVydFByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRIaXN0b3JpY2FsRXhwcmVzc2lvbnMoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIHRvVGV4dEFyZWFRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogVGV4dEFyZWFJbnB1dFF1ZXN0aW9uIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBUZXh0QXJlYUlucHV0UXVlc3Rpb24oe1xuICAgICAgaXNFeHBhbmRlZDogZmFsc2UsIHJvd3M6IDE4LFxuICAgICAgcGxhY2Vob2xkZXI6ICcnLCB0eXBlOiAnJywga2V5OiAnJ1xuICAgIH0pO1xuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XG4gICAgcXVlc3Rpb24ua2V5ID0gc2NoZW1hUXVlc3Rpb24uaWQ7XG4gICAgcXVlc3Rpb24ucGxhY2Vob2xkZXIgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMucGxhY2Vob2xkZXI7XG4gICAgcXVlc3Rpb24uaXNFeHBhbmRlZCA9IHNjaGVtYVF1ZXN0aW9uLmlzRXhwYW5kZWQ7XG4gICAgcXVlc3Rpb24ucm93cyA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5yb3dzO1xuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuICAgIHF1ZXN0aW9uLnBsYWNlaG9sZGVyID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnBsYWNlaG9sZGVyIHx8ICcnO1xuXG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICBpZDogJ2tleSdcbiAgICB9O1xuXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b1RleHRRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogVGV4dElucHV0UXVlc3Rpb24ge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IFRleHRJbnB1dFF1ZXN0aW9uKHsgcGxhY2Vob2xkZXI6ICcnLCB0eXBlOiAnJywga2V5OiAnJyB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xuICAgIHF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPSAndGV4dCc7XG4gICAgcXVlc3Rpb24ucGxhY2Vob2xkZXIgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMucGxhY2Vob2xkZXI7XG4gICAgcXVlc3Rpb24udmFsaWRhdG9ycyA9IHRoaXMuYWRkVmFsaWRhdG9ycyhzY2hlbWFRdWVzdGlvbik7XG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XG4gICAgcXVlc3Rpb24ucGxhY2Vob2xkZXIgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMucGxhY2Vob2xkZXIgfHwgJyc7XG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICBpZDogJ2tleSdcbiAgICB9O1xuXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b0ZpbGVVcGxvYWRRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogRmlsZVVwbG9hZFF1ZXN0aW9uIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBGaWxlVXBsb2FkUXVlc3Rpb24oeyB0eXBlOiAnJywga2V5OiAnJyB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xuICAgIHF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPSAnZmlsZSc7XG4gICAgcXVlc3Rpb24uZGF0YVNvdXJjZSA9ICdmaWxlJztcbiAgICBxdWVzdGlvbi52YWxpZGF0b3JzID0gdGhpcy5hZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICBxdWVzdGlvbi5leHRyYXMgPSBzY2hlbWFRdWVzdGlvbjtcblxuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XG4gICAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgaWQ6ICdrZXknXG4gICAgfTtcblxuICAgIHRoaXMuY29weVByb3BlcnRpZXMobWFwcGluZ3MsIHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgdG9EcnVnUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFNlbGVjdFF1ZXN0aW9uIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBTZWxlY3RRdWVzdGlvbih7IG9wdGlvbnM6IFtdLCB0eXBlOiAnJywga2V5OiAnJyB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xuICAgIHF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPSAncmVtb3RlLXNlbGVjdCc7XG4gICAgcXVlc3Rpb24udmFsaWRhdG9ycyA9IHRoaXMuYWRkVmFsaWRhdG9ycyhzY2hlbWFRdWVzdGlvbik7XG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XG4gICAgcXVlc3Rpb24uZGF0YVNvdXJjZSA9ICdkcnVnJztcbiAgICBjb25zdCBtYXBwaW5nczogYW55ID0ge1xuICAgICAgbGFiZWw6ICdsYWJlbCcsXG4gICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgIGlkOiAna2V5J1xuICAgIH07XG5cbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRBbGVydFByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRIaXN0b3JpY2FsRXhwcmVzc2lvbnMoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIHRvUHJvYmxlbVF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBTZWxlY3RRdWVzdGlvbiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgU2VsZWN0UXVlc3Rpb24oeyBvcHRpb25zOiBbXSwgdHlwZTogJycsIGtleTogJycgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gJ3JlbW90ZS1zZWxlY3QnO1xuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuICAgIHF1ZXN0aW9uLmRhdGFTb3VyY2UgPSAncHJvYmxlbSc7XG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICBpZDogJ2tleSdcbiAgICB9O1xuXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b0NvbmNlcHRBbnN3ZXJTZWxlY3Qoc2NoZW1hUXVlc3Rpb246IGFueSk6IFNlbGVjdFF1ZXN0aW9uIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBTZWxlY3RRdWVzdGlvbih7IG9wdGlvbnM6IFtdLCB0eXBlOiAnJywga2V5OiAnJyB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xuICAgIHF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPSAncmVtb3RlLXNlbGVjdCc7XG4gICAgcXVlc3Rpb24udmFsaWRhdG9ycyA9IHRoaXMuYWRkVmFsaWRhdG9ycyhzY2hlbWFRdWVzdGlvbik7XG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XG4gICAgcXVlc3Rpb24uZGF0YVNvdXJjZSA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5kYXRhU291cmNlIHx8ICdjb25jZXB0QW5zd2Vycyc7XG4gICAgcXVlc3Rpb24uZGF0YVNvdXJjZU9wdGlvbnMgPSB7XG4gICAgICBjb25jZXB0OiBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdFxuICAgIH07XG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICBpZDogJ2tleSdcbiAgICB9O1xuXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b1JlcGVhdGluZ1F1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBSZXBlYXRpbmdRdWVzdGlvbiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgUmVwZWF0aW5nUXVlc3Rpb24oeyBxdWVzdGlvbnM6IFtdLCB0eXBlOiAnJywga2V5OiAnJyB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLnF1ZXN0aW9ucyA9IHRoaXMuZ2V0Q2hpbGRyZW5RdWVzdGlvbk1vZGVscyhzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbnMpO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuXG4gICAgaWYgKHNjaGVtYVF1ZXN0aW9uLnR5cGUgPT09ICd0ZXN0T3JkZXInKSB7XG4gICAgICBjb25zdCB0ZXN0T3JkZXIgPSB0aGlzLnRvVGVzdE9yZGVyUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb24pO1xuICAgICAgY29uc3Qgb3JkZXJzID0gW107IG9yZGVycy5wdXNoKHRlc3RPcmRlcik7XG4gICAgICBxdWVzdGlvbi5xdWVzdGlvbnMgPSBvcmRlcnM7XG4gICAgfVxuXG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICBpZDogJ2tleSdcbiAgICB9O1xuXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b0dyb3VwUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFF1ZXN0aW9uR3JvdXAge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IFF1ZXN0aW9uR3JvdXAoeyBxdWVzdGlvbnM6IFtdLCB0eXBlOiAnJywga2V5OiAnJyB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLnF1ZXN0aW9ucyA9IHRoaXMuZ2V0Q2hpbGRyZW5RdWVzdGlvbk1vZGVscyhzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbnMpO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuXG4gICAgY29uc3QgbWFwcGluZ3M6IGFueSA9IHtcbiAgICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgICAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gICAgICBpZDogJ2tleSdcbiAgICB9O1xuXG4gICAgdGhpcy5jb3B5UHJvcGVydGllcyhtYXBwaW5ncywgc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b1BhZ2VRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogUXVlc3Rpb25Hcm91cCB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgUXVlc3Rpb25Hcm91cCh7IHF1ZXN0aW9uczogW10sIHR5cGU6ICcnLCBrZXk6ICcnIH0pO1xuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XG4gICAgcXVlc3Rpb24ua2V5ID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9ICdwYWdlJztcbiAgICBxdWVzdGlvbi5jb250cm9sVHlwZSA9IEFmZUNvbnRyb2xUeXBlLk5vbmU7XG4gICAgcXVlc3Rpb24ucXVlc3Rpb25zID0gW107XG4gICAgc2NoZW1hUXVlc3Rpb24uc2VjdGlvbnMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgIHF1ZXN0aW9uLnF1ZXN0aW9ucy5wdXNoKHRoaXMudG9TZWN0aW9uUXVlc3Rpb24oZWxlbWVudCkpO1xuICAgIH0pO1xuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIHRvRm9ybVF1ZXN0aW9uTW9kZWwoc2NoZW1hUXVlc3Rpb246IGFueSk6IFF1ZXN0aW9uR3JvdXAge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IFF1ZXN0aW9uR3JvdXAoeyBxdWVzdGlvbnM6IFtdLCB0eXBlOiAnJywga2V5OiAnJyB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPSAnZm9ybSc7XG4gICAgcXVlc3Rpb24uY29udHJvbFR5cGUgPSBBZmVDb250cm9sVHlwZS5BZmVGb3JtR3JvdXA7XG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XG4gICAgcXVlc3Rpb24ucXVlc3Rpb25zID0gW107XG4gICAgc2NoZW1hUXVlc3Rpb24ucGFnZXMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgIHF1ZXN0aW9uLnF1ZXN0aW9ucy5wdXNoKHRoaXMudG9QYWdlUXVlc3Rpb24oZWxlbWVudCkpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgdG9TZWN0aW9uUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFF1ZXN0aW9uR3JvdXAge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IFF1ZXN0aW9uR3JvdXAoeyBxdWVzdGlvbnM6IFtdLCB0eXBlOiAnJywga2V5OiAnJyB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPSAnc2VjdGlvbic7XG4gICAgcXVlc3Rpb24uY29udHJvbFR5cGUgPSBBZmVDb250cm9sVHlwZS5Ob25lO1xuICAgIHF1ZXN0aW9uLmlzRXhwYW5kZWQgPSBzY2hlbWFRdWVzdGlvbi5pc0V4cGFuZGVkID09PSAndHJ1ZScgPyB0cnVlIDogZmFsc2U7XG4gICAgcXVlc3Rpb24ucXVlc3Rpb25zID0gdGhpcy5nZXRTY2hlbWFRdWVzdGlvbnMoc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25zKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b1BlcnNvbkF0dHJpYnV0ZVF1ZXN0aW9uKHNjaGVtYVF1ZXN0aW9uOiBhbnkpOiBVaVNlbGVjdFF1ZXN0aW9uIHtcbiAgICBjb25zdCBxdWVzdGlvbiA9IG5ldyBVaVNlbGVjdFF1ZXN0aW9uKHtcbiAgICAgIG9wdGlvbnM6IFtdLCB0eXBlOiAnJywga2V5OiAnJywgc2VhcmNoRnVuY3Rpb246IGZ1bmN0aW9uICgpIHsgfSxcbiAgICAgIHJlc29sdmVGdW5jdGlvbjogZnVuY3Rpb24gKCkge1xuXG4gICAgICB9XG4gICAgfSk7XG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcbiAgICBxdWVzdGlvbi5yZW5kZXJpbmdUeXBlID0gJ3JlbW90ZS1zZWxlY3QnO1xuICAgIHF1ZXN0aW9uLnZhbGlkYXRvcnMgPSB0aGlzLmFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb24pO1xuICAgIHF1ZXN0aW9uLmV4dHJhcyA9IHNjaGVtYVF1ZXN0aW9uO1xuICAgIHF1ZXN0aW9uLmRhdGFTb3VyY2UgPSAncGVyc29uQXR0cmlidXRlJztcblxuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XG4gICAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgaWQ6ICdrZXknXG4gICAgfTtcblxuICAgIHRoaXMuY29weVByb3BlcnRpZXMobWFwcGluZ3MsIHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRIaXN0b3JpY2FsRXhwcmVzc2lvbnMoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZERpc2FibGVPckhpZGVQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkSGlzdG9yaWNhbEV4cHJlc3Npb25zKHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRDYWxjdWxhdG9yUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICByZXR1cm4gcXVlc3Rpb247XG4gIH1cblxuICB0b0VuY291bnRlclByb3ZpZGVyUXVlc3Rpb24oc2NoZW1hUXVlc3Rpb246IGFueSk6IFVpU2VsZWN0UXVlc3Rpb24ge1xuICAgIGNvbnN0IHF1ZXN0aW9uID0gbmV3IFVpU2VsZWN0UXVlc3Rpb24oe1xuICAgICAgb3B0aW9uczogW10sIHR5cGU6ICcnLCBrZXk6ICcnLCBzZWFyY2hGdW5jdGlvbjogZnVuY3Rpb24gKCkgeyB9LFxuICAgICAgcmVzb2x2ZUZ1bmN0aW9uOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIH1cbiAgICB9KTtcbiAgICBxdWVzdGlvbi5sYWJlbCA9IHNjaGVtYVF1ZXN0aW9uLmxhYmVsO1xuICAgIHF1ZXN0aW9uLmtleSA9IHNjaGVtYVF1ZXN0aW9uLmlkO1xuICAgIHF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPSAncmVtb3RlLXNlbGVjdCc7XG4gICAgcXVlc3Rpb24udmFsaWRhdG9ycyA9IHRoaXMuYWRkVmFsaWRhdG9ycyhzY2hlbWFRdWVzdGlvbik7XG4gICAgcXVlc3Rpb24uZXh0cmFzID0gc2NoZW1hUXVlc3Rpb247XG4gICAgcXVlc3Rpb24uZGF0YVNvdXJjZSA9ICdwcm92aWRlcic7XG5cbiAgICBjb25zdCBtYXBwaW5nczogYW55ID0ge1xuICAgICAgbGFiZWw6ICdsYWJlbCcsXG4gICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgIGlkOiAna2V5J1xuICAgIH07XG5cbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkRGlzYWJsZU9ySGlkZVByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRBbGVydFByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGRIaXN0b3JpY2FsRXhwcmVzc2lvbnMoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZENhbGN1bGF0b3JQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIHRvRmllbGRTZXRRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogUXVlc3Rpb25Hcm91cCB7XG4gICAgY29uc3QgdG9SZXR1cm4gPSB0aGlzLnRvR3JvdXBRdWVzdGlvbihzY2hlbWFRdWVzdGlvbik7XG4gICAgdG9SZXR1cm4ucmVuZGVyaW5nVHlwZSA9ICdmaWVsZC1zZXQnO1xuICAgIHJldHVybiB0b1JldHVybjtcbiAgfVxuXG4gIHRvRW5jb3VudGVyTG9jYXRpb25RdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogVWlTZWxlY3RRdWVzdGlvbiB7XG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgVWlTZWxlY3RRdWVzdGlvbih7XG4gICAgICBvcHRpb25zOiBbXSwgdHlwZTogJycsIGtleTogJycsIHNlYXJjaEZ1bmN0aW9uOiBmdW5jdGlvbiAoKSB7IH0sXG4gICAgICByZXNvbHZlRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcblxuICAgICAgfVxuICAgIH0pO1xuICAgIHF1ZXN0aW9uLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XG4gICAgcXVlc3Rpb24ua2V5ID0gc2NoZW1hUXVlc3Rpb24uaWQ7XG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9IHNjaGVtYVF1ZXN0aW9uLnR5cGU7XG4gICAgcXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9ICdyZW1vdGUtc2VsZWN0JztcbiAgICBxdWVzdGlvbi52YWxpZGF0b3JzID0gdGhpcy5hZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICBxdWVzdGlvbi5leHRyYXMgPSBzY2hlbWFRdWVzdGlvbjtcbiAgICBxdWVzdGlvbi5kYXRhU291cmNlID0gJ2xvY2F0aW9uJztcblxuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XG4gICAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgaWQ6ICdrZXknXG4gICAgfTtcblxuICAgIHRoaXMuY29weVByb3BlcnRpZXMobWFwcGluZ3MsIHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgdGhpcy5hZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEFsZXJ0UHJvcGVydHkoc2NoZW1hUXVlc3Rpb24sIHF1ZXN0aW9uKTtcbiAgICB0aGlzLmFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHRoaXMuYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uLCBxdWVzdGlvbik7XG4gICAgcmV0dXJuIHF1ZXN0aW9uO1xuICB9XG5cbiAgdG9UZXN0T3JkZXJRdWVzdGlvbihzY2hlbWFRdWVzdGlvbjogYW55KTogVGVzdE9yZGVyUXVlc3Rpb24ge1xuXG4gICAgY29uc3QgcXVlc3Rpb24gPSBuZXcgVGVzdE9yZGVyUXVlc3Rpb24oe1xuICAgICAgdHlwZTogJycsIGtleTogJycsIG9yZGVyVHlwZTogJycsIHNlbGVjdGFibGVPcmRlcnM6IFtdLFxuICAgICAgb3JkZXJTZXR0aW5nVXVpZDogJycsIGxhYmVsOiAnJywgcmVuZGVyaW5nOiAnJ1xuICAgIH0pO1xuXG4gICAgcXVlc3Rpb24ubGFiZWwgPSBzY2hlbWFRdWVzdGlvbi5sYWJlbDtcbiAgICBxdWVzdGlvbi5rZXkgPSBzY2hlbWFRdWVzdGlvbi5pZDtcbiAgICBxdWVzdGlvbi52YWxpZGF0b3JzID0gdGhpcy5hZGRWYWxpZGF0b3JzKHNjaGVtYVF1ZXN0aW9uKTtcbiAgICBxdWVzdGlvbi5leHRyYXMgPSBzY2hlbWFRdWVzdGlvbjtcbiAgICBxdWVzdGlvbi5vcHRpb25zID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnNlbGVjdGFibGVPcmRlcnMubWFwKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxhYmVsOiBvYmoubGFiZWwsXG4gICAgICAgIHZhbHVlOiBvYmouY29uY2VwdFxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGNvbnN0IG1hcHBpbmdzOiBhbnkgPSB7XG4gICAgICBsYWJlbDogJ2xhYmVsJyxcbiAgICAgIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICAgICAgaWQ6ICdrZXknXG4gICAgfTtcbiAgICB0aGlzLmNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzLCBzY2hlbWFRdWVzdGlvbiwgcXVlc3Rpb24pO1xuICAgIHJldHVybiBxdWVzdGlvbjtcbiAgfVxuXG4gIGdldFNjaGVtYVF1ZXN0aW9ucyhzY2hlbWE6IGFueSk6IGFueSB7XG4gICAgY29uc3QgbGlzdFF1ZXN0aW9ucyA9IG5ldyBBcnJheSgpO1xuICAgIHRoaXMuZ2V0UXVlc3Rpb25zKHNjaGVtYSwgbGlzdFF1ZXN0aW9ucyk7XG4gICAgcmV0dXJuIGxpc3RRdWVzdGlvbnM7XG4gIH1cblxuICBnZXRRdWVzdGlvbnMoc2NoZW1hOiBhbnksIGZvdW5kQXJyYXk6IGFueSk6IGFueSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGZvdW5kQXJyYXkpKSB7XG4gICAgICBmb3VuZEFycmF5ID0gW107XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KHNjaGVtYSkpIHtcblxuICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBzY2hlbWEpIHtcbiAgICAgICAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgICAgICB0aGlzLmdldFF1ZXN0aW9ucyhzY2hlbWFbcHJvcGVydHldLCBmb3VuZEFycmF5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzY2hlbWEgJiYgIUFycmF5LmlzQXJyYXkoc2NoZW1hKSAmJiB0eXBlb2Ygc2NoZW1hID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHNjaGVtYS5xdWVzdGlvbk9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHNjaGVtYS5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAnZ3JvdXAnIHx8XG4gICAgICAgICAgc2NoZW1hLnF1ZXN0aW9uT3B0aW9ucy5yZW5kZXJpbmcgPT09ICdyZXBlYXRpbmcnKSB7XG4gICAgICAgICAgLy8gc2NoZW1hLnF1ZXN0aW9ucyA9IHRoaXMuZ2V0R3JvdXBNZW1iZXJzKHNjaGVtYS5xdWVzdGlvbnMpO1xuICAgICAgICAgIGZvdW5kQXJyYXkucHVzaCh0aGlzLnRvTW9kZWwoc2NoZW1hLCBzY2hlbWEucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZykpO1xuICAgICAgICB9IGVsc2UgaWYgKHNjaGVtYS5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID09PSAnZmllbGQtc2V0Jykge1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZvdW5kQXJyYXkucHVzaCh0aGlzLnRvTW9kZWwoc2NoZW1hLCBzY2hlbWEucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZykpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGNvbnN0IG8gaW4gc2NoZW1hKSB7XG4gICAgICAgICAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eShvKSkge1xuICAgICAgICAgICAgdGhpcy5nZXRRdWVzdGlvbnMoc2NoZW1hW29dLCBmb3VuZEFycmF5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG4gIGdldENoaWxkcmVuUXVlc3Rpb25Nb2RlbHMoc2NoZW1hOiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gW107XG4gICAgdGhpcy5nZXRRdWVzdGlvbnMoc2NoZW1hLCBjaGlsZHJlbik7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuXG4gIH1cblxuICB0b01vZGVsKHNjaGVtYTogYW55LCByZW5kZXJUeXBlOiBzdHJpbmcpOiBhbnkge1xuICAgIGlmIChyZW5kZXJUeXBlID09PSAndWktc2VsZWN0LWV4dGVuZGVkJykge1xuICAgICAgcmVuZGVyVHlwZSA9IHNjaGVtYS50eXBlO1xuICAgIH1cbiAgICBpZiAoIXNjaGVtYS5pZCkge1xuICAgICAgc2NoZW1hWydpZCddID0gdGhpcy5nZW5lcmF0ZUlkKDEwKTtcbiAgICB9XG5cbiAgICBpZiAoc2NoZW1hLnF1ZXN0aW9uT3B0aW9ucyAmJlxuICAgICAgKHNjaGVtYS5xdWVzdGlvbk9wdGlvbnMuc2hvd0RhdGUgPT09IHRydWUgfHxcbiAgICAgICAgc2NoZW1hLnF1ZXN0aW9uT3B0aW9ucy5zaG93RGF0ZSA9PT0gJ3RydWUnKSkge1xuICAgICAgc2NoZW1hID0gdGhpcy5jb252ZXJ0T2xkVmVyc2lvbkNvbXBsZXhPYnNRdWVzdGlvblRvTmV3VmVyc2lvbihzY2hlbWEpO1xuICAgICAgcmVuZGVyVHlwZSA9ICdmaWVsZC1zZXQnO1xuICAgIH1cblxuICAgIHN3aXRjaCAocmVuZGVyVHlwZSkge1xuICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9TZWxlY3RRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAnc2luZ2xlLXNlbGVjdCc6XG4gICAgICAgIHJldHVybiB0aGlzLnRvU2VsZWN0UXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ211bHRpLXNlbGVjdCc6XG4gICAgICAgIHJldHVybiB0aGlzLnRvU2VsZWN0UXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ251bWVyaWMnOlxuICAgICAgICByZXR1cm4gdGhpcy50b051bWVyaWNRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9OdW1iZXJRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAnZW5jb3VudGVyRGF0ZXRpbWUnOlxuICAgICAgICByZXR1cm4gdGhpcy50b0VuY291bnRlckRhdGV0aW1lUXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICByZXR1cm4gdGhpcy50b0RhdGVRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAnbXVsdGlDaGVja2JveCc6XG4gICAgICAgIHJldHVybiB0aGlzLnRvTXVsdGlDaGVja2JveFF1ZXN0aW9uKHNjaGVtYSk7XG4gICAgICBjYXNlICdkcnVnJzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9EcnVnUXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ3Byb2JsZW0nOlxuICAgICAgICByZXR1cm4gdGhpcy50b1Byb2JsZW1RdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAnZ3JvdXAnOlxuICAgICAgICByZXR1cm4gdGhpcy50b0dyb3VwUXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ2ZpZWxkLXNldCc6XG4gICAgICAgIHJldHVybiB0aGlzLnRvRmllbGRTZXRRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAncmVwZWF0aW5nJzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9SZXBlYXRpbmdRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAncGVyc29uQXR0cmlidXRlJzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9QZXJzb25BdHRyaWJ1dGVRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAndGV4dCc6XG4gICAgICAgIHJldHVybiB0aGlzLnRvVGV4dFF1ZXN0aW9uKHNjaGVtYSk7XG4gICAgICBjYXNlICd0ZXh0YXJlYSc6XG4gICAgICAgIHJldHVybiB0aGlzLnRvVGV4dEFyZWFRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAndGV4dGFyZWEnOlxuICAgICAgICByZXR1cm4gdGhpcy50b1RleHRBcmVhUXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ3NlbGVjdC1jb25jZXB0LWFuc3dlcnMnOlxuICAgICAgICByZXR1cm4gdGhpcy50b0NvbmNlcHRBbnN3ZXJTZWxlY3Qoc2NoZW1hKTtcbiAgICAgIGNhc2UgJ2VuY291bnRlckxvY2F0aW9uJzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9FbmNvdW50ZXJMb2NhdGlvblF1ZXN0aW9uKHNjaGVtYSk7XG4gICAgICBjYXNlICdlbmNvdW50ZXJEYXRldGltZSc6XG4gICAgICAgIHJldHVybiB0aGlzLnRvRW5jb3VudGVyRGF0ZXRpbWVRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAnZW5jb3VudGVyUHJvdmlkZXInOlxuICAgICAgICByZXR1cm4gdGhpcy50b0VuY291bnRlclByb3ZpZGVyUXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ3JhZGlvJzpcbiAgICAgICAgcmV0dXJuIHRoaXMudG9DaGVja0JveFF1ZXN0aW9uKHNjaGVtYSk7XG4gICAgICBjYXNlICdjaGVja2JveCc6XG4gICAgICAgIHJldHVybiB0aGlzLnRvQ2hlY2tCb3hRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgY2FzZSAnZW5jb3VudGVyUHJvdmlkZXInOlxuICAgICAgICByZXR1cm4gdGhpcy50b0VuY291bnRlclByb3ZpZGVyUXVlc3Rpb24oc2NoZW1hKTtcbiAgICAgIGNhc2UgJ2ZpbGUnOlxuICAgICAgICByZXR1cm4gdGhpcy50b0ZpbGVVcGxvYWRRdWVzdGlvbihzY2hlbWEpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS53YXJuKCdOZXcgU2NoZW1hIFF1ZXN0aW9uIFR5cGUgZm91bmQuLi4uLi4uLi4nICsgcmVuZGVyVHlwZSk7XG4gICAgICAgIHJldHVybiB0aGlzLnRvVGV4dFF1ZXN0aW9uKHNjaGVtYSk7XG4gICAgfVxuXG4gIH1cblxuICBjb252ZXJ0T2xkVmVyc2lvbkNvbXBsZXhPYnNRdWVzdGlvblRvTmV3VmVyc2lvbihzY2hlbWFRdWVzdGlvbjogYW55KSB7XG4gICAgY29uc3QgY29udmVydGVkOiBhbnkgPSB7fTtcbiAgICBjb252ZXJ0ZWQudHlwZSA9ICdjb21wbGV4LW9icyc7XG4gICAgY29udmVydGVkLmxhYmVsID0gc2NoZW1hUXVlc3Rpb24ubGFiZWw7XG4gICAgY29udmVydGVkLmlkID0gJ2NvbXBsZXhfJyArIHNjaGVtYVF1ZXN0aW9uLmlkO1xuICAgIGNvbnZlcnRlZC5xdWVzdGlvbk9wdGlvbnMgPSB7fTtcbiAgICBjb252ZXJ0ZWQucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQgPSBzY2hlbWFRdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdDtcbiAgICBjb252ZXJ0ZWQucXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA9ICdmaWVsZC1zZXQnO1xuICAgIGNvbnZlcnRlZC5xdWVzdGlvbnMgPSBbXTtcbiAgICBjb252ZXJ0ZWQudmFsaWRhdG9ycyA9IFtdO1xuXG4gICAgY29uc3QgbWFpbkZpZWxkOiBhbnkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHNjaGVtYVF1ZXN0aW9uKSk7XG4gICAgbWFpbkZpZWxkLnR5cGUgPSAnY29tcGxleC1vYnMtY2hpbGQnO1xuICAgIGRlbGV0ZSBtYWluRmllbGQucXVlc3Rpb25PcHRpb25zLnNob3dEYXRlO1xuICAgIGRlbGV0ZSBtYWluRmllbGQucXVlc3Rpb25PcHRpb25zLnNob3duRGF0ZU9wdGlvbnM7XG4gICAgbWFpbkZpZWxkLnF1ZXN0aW9uT3B0aW9ucy5vYnNGaWVsZCA9ICd2YWx1ZSc7XG5cbiAgICBjb25zdCBkYXRlRmllbGQ6IGFueSA9IHt9O1xuICAgIGRhdGVGaWVsZC50eXBlID0gJ2NvbXBsZXgtb2JzLWNoaWxkJztcbiAgICBkYXRlRmllbGQubGFiZWwgPSAnRGF0ZSBvZiAnICsgbWFpbkZpZWxkLmxhYmVsO1xuICAgIGRhdGVGaWVsZC5pZCA9ICdkYXRlXycgKyBtYWluRmllbGQuaWQ7XG4gICAgZGF0ZUZpZWxkLnF1ZXN0aW9uT3B0aW9ucyA9IHt9O1xuICAgIGRhdGVGaWVsZC5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0O1xuICAgIGRhdGVGaWVsZC5xdWVzdGlvbk9wdGlvbnMucmVuZGVyaW5nID0gJ2RhdGUnO1xuICAgIGRhdGVGaWVsZC5xdWVzdGlvbk9wdGlvbnMub2JzRmllbGQgPSAnb2JzRGF0ZXRpbWUnO1xuICAgIGNvbnN0IGRhdGVPcHRpb25zOiBhbnkgPSAoT2JqZWN0IGFzIGFueSkuYXNzaWduKHt9LFxuICAgICAgc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnNob3duRGF0ZU9wdGlvbnMpO1xuICAgIGRhdGVGaWVsZC52YWxpZGF0b3JzID0gZGF0ZU9wdGlvbnMudmFsaWRhdG9ycztcbiAgICBkYXRlRmllbGQuaGlkZSA9IGRhdGVPcHRpb25zLmhpZGU7XG5cblxuICAgIGNvbnZlcnRlZC5xdWVzdGlvbnMucHVzaChtYWluRmllbGQpO1xuICAgIGNvbnZlcnRlZC5xdWVzdGlvbnMucHVzaChkYXRlRmllbGQpO1xuXG4gICAgcmV0dXJuIGNvbnZlcnRlZDtcbiAgfVxuXG4gIGNvcHlQcm9wZXJ0aWVzKG1hcHBpbmdzOiBhbnksIHNvdXJjZTogYW55LCBkZXN0aW5hdGlvbjogUXVlc3Rpb25CYXNlKSB7XG5cbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKG1hcHBpbmdzLmhhc093blByb3BlcnR5KHByb3BlcnR5KSAmJiBkZXN0aW5hdGlvbi5oYXNPd25Qcm9wZXJ0eShtYXBwaW5nc1twcm9wZXJ0eV0pKSB7XG4gICAgICAgIGRlc3RpbmF0aW9uW21hcHBpbmdzW3Byb3BlcnR5XV0gPSBzb3VyY2VbcHJvcGVydHldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFkZFZhbGlkYXRvcnMoc2NoZW1hUXVlc3Rpb246IGFueSk6IEFycmF5PFZhbGlkYXRpb25Nb2RlbD4ge1xuXG4gICAgY29uc3QgdmFsaWRhdG9yczogQXJyYXk8VmFsaWRhdGlvbk1vZGVsPiA9IFtdO1xuXG4gICAgaWYgKHNjaGVtYVF1ZXN0aW9uLnZhbGlkYXRvcnMpIHtcblxuICAgICAgLy8gVE9ETyAtIGFkZCBtb3JlIHZhbGlkYXRvciB0eXBlc1xuICAgICAgXy5mb3JFYWNoKHNjaGVtYVF1ZXN0aW9uLnZhbGlkYXRvcnMsICh2YWxpZGF0b3I6IGFueSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKHZhbGlkYXRvci50eXBlKSB7XG4gICAgICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgICAgICB2YWxpZGF0b3JzLnB1c2gobmV3IERhdGVWYWxpZGF0aW9uTW9kZWwodmFsaWRhdG9yKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdqc19leHByZXNzaW9uJzpcbiAgICAgICAgICAgIHZhbGlkYXRvcnMucHVzaChuZXcgSnNFeHByZXNzaW9uVmFsaWRhdGlvbk1vZGVsKHZhbGlkYXRvcikpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnY29uZGl0aW9uYWxBbnN3ZXJlZCc6XG4gICAgICAgICAgICB2YWxpZGF0b3JzLnB1c2gobmV3IENvbmRpdGlvbmFsVmFsaWRhdGlvbk1vZGVsKHZhbGlkYXRvcikpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHZhbGlkYXRvcnMucHVzaChuZXcgVmFsaWRhdGlvbk1vZGVsKHZhbGlkYXRvcikpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHF1ZXN0aW9uT3B0aW9ucyA9IHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucztcbiAgICBjb25zdCByZW5kZXJpbmdUeXBlID0gcXVlc3Rpb25PcHRpb25zID8gcXVlc3Rpb25PcHRpb25zLnJlbmRlcmluZyA6ICcnO1xuICAgIHN3aXRjaCAocmVuZGVyaW5nVHlwZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcblxuICAgICAgICBpZiAocXVlc3Rpb25PcHRpb25zLm1heCAmJiBxdWVzdGlvbk9wdGlvbnMubWluKSB7XG4gICAgICAgICAgdmFsaWRhdG9ycy5wdXNoKG5ldyBNYXhWYWxpZGF0aW9uTW9kZWwoe1xuICAgICAgICAgICAgdHlwZTogJ21heCcsXG4gICAgICAgICAgICBtYXg6IHF1ZXN0aW9uT3B0aW9ucy5tYXhcbiAgICAgICAgICB9KSk7XG4gICAgICAgICAgdmFsaWRhdG9ycy5wdXNoKG5ldyBNaW5WYWxpZGF0aW9uTW9kZWwoe1xuICAgICAgICAgICAgdHlwZTogJ21pbicsXG4gICAgICAgICAgICBtaW46IHF1ZXN0aW9uT3B0aW9ucy5taW5cbiAgICAgICAgICB9KSk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIC8vIGFkZCBjb25kaXRpb25hbCByZXF1aXJlZCB2YWxpZGF0b3JzXG4gICAgaWYgKHR5cGVvZiBzY2hlbWFRdWVzdGlvbi5yZXF1aXJlZCA9PT0gJ29iamVjdCcpIHtcblxuICAgICAgY29uc3QgcmVxdWlyZWQ6IGFueSA9IHNjaGVtYVF1ZXN0aW9uLnJlcXVpcmVkO1xuXG4gICAgICBpZiAocmVxdWlyZWQudHlwZSA9PT0gJ2NvbmRpdGlvbmFsUmVxdWlyZWQnKSB7XG5cbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKG5ldyBDb25kaXRpb25hbFZhbGlkYXRpb25Nb2RlbCh7XG4gICAgICAgICAgcmVmZXJlbmNlUXVlc3Rpb25JZDogcmVxdWlyZWQucmVmZXJlbmNlUXVlc3Rpb25JZCxcbiAgICAgICAgICByZWZlcmVuY2VRdWVzdGlvbkFuc3dlcnM6IHJlcXVpcmVkLnJlZmVyZW5jZVF1ZXN0aW9uQW5zd2VycyxcbiAgICAgICAgICB0eXBlOiByZXF1aXJlZC50eXBlLFxuICAgICAgICAgIG1lc3NhZ2U6IHJlcXVpcmVkLm1lc3NhZ2UsXG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWRhdG9ycztcbiAgfVxuXG4gIGFkZEhpc3RvcmljYWxFeHByZXNzaW9ucyhzY2hlbWFRdWVzdGlvbjogYW55LCBxdWVzdGlvbjogUXVlc3Rpb25CYXNlKTogYW55IHtcbiAgICBpZiAoc2NoZW1hUXVlc3Rpb24uaGlzdG9yaWNhbEV4cHJlc3Npb24gJiYgc2NoZW1hUXVlc3Rpb24uaGlzdG9yaWNhbEV4cHJlc3Npb24ubGVuZ3RoID4gMCkge1xuICAgICAgcXVlc3Rpb24uc2V0SGlzdG9yaWNhbFZhbHVlKHRydWUpO1xuICAgICAgaWYgKHNjaGVtYVF1ZXN0aW9uLnNob3dIaXN0b3JpY2FsRW5jb3VudGVyRGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHF1ZXN0aW9uLnNob3dIaXN0b3JpY2FsRW5jb3VudGVyRGF0ZShcbiAgICAgICAgICAoc2NoZW1hUXVlc3Rpb24uc2hvd0hpc3RvcmljYWxFbmNvdW50ZXJEYXRlID09PSAndHJ1ZScpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXN0aW9uLnNob3dIaXN0b3JpY2FsRW5jb3VudGVyRGF0ZSgpO1xuICAgICAgfVxuICAgICAgY29uc3Qgb3JpZ1ZhbHVlID0gdGhpcy5oaXN0b3JpY2FsSGVscGVyU2VydmljZS5ldmFsdWF0ZShzY2hlbWFRdWVzdGlvbi5oaXN0b3JpY2FsRXhwcmVzc2lvbixcbiAgICAgICAgdGhpcy5kYXRhU291cmNlcyk7XG4gICAgICBxdWVzdGlvbi5oaXN0b3JpY2FsRGF0YVZhbHVlID0gb3JpZ1ZhbHVlO1xuICAgICAgaWYgKHNjaGVtYVF1ZXN0aW9uLmhpc3RvcmljYWxQcmVwb3B1bGF0ZSkge1xuICAgICAgICBxdWVzdGlvbi5kZWZhdWx0VmFsdWUgPSBvcmlnVmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWRkQ2FsY3VsYXRvclByb3BlcnR5KHNjaGVtYVF1ZXN0aW9uOiBhbnksIHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UpOiBhbnkge1xuXG4gICAgaWYgKHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucyAmJlxuICAgICAgdHlwZW9mIHNjaGVtYVF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5jYWxjdWxhdGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBxdWVzdGlvbi5jYWxjdWxhdGVFeHByZXNzaW9uID0gc2NoZW1hUXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLmNhbGN1bGF0ZS5jYWxjdWxhdGVFeHByZXNzaW9uO1xuICAgIH1cblxuICB9XG5cbiAgYWRkQWxlcnRQcm9wZXJ0eShzY2hlbWFRdWVzdGlvbjogYW55LCBxdWVzdGlvbjogUXVlc3Rpb25CYXNlKTogYW55IHtcbiAgICBpZiAoc2NoZW1hUXVlc3Rpb24uYWxlcnQpIHtcbiAgICAgIHF1ZXN0aW9uLmFsZXJ0ID0gc2NoZW1hUXVlc3Rpb24uYWxlcnQ7XG4gICAgfVxuICAgIC8vIGlmICh0eXBlb2Ygc2NoZW1hUXVlc3Rpb24ubWVzc2FnZSA9PT0gJ29iamVjdCcpIHtcbiAgICAvLyAgIGlmIChzY2hlbWFRdWVzdGlvbi5tZXNzYWdlLmFsZXJ0V2hlbkV4cHJlc3Npb24pIHtcbiAgICAvLyAgICAgcXVlc3Rpb24ubWVzc2FnZSA9IHNjaGVtYVF1ZXN0aW9uLm1lc3NhZ2UuYWxlcnRXaGVuRXhwcmVzc2lvbjtcbiAgICAvLyAgIH1cbiAgICAvLyB9XG4gIH1cblxuICBhZGREaXNhYmxlT3JIaWRlUHJvcGVydHkoc2NoZW1hUXVlc3Rpb246IGFueSwgcXVlc3Rpb246IFF1ZXN0aW9uQmFzZSk6IGFueSB7XG5cbiAgICBpZiAoISFzY2hlbWFRdWVzdGlvbi5kaXNhYmxlKSB7XG4gICAgICBxdWVzdGlvbi5kaXNhYmxlID0gc2NoZW1hUXVlc3Rpb24uZGlzYWJsZTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHNjaGVtYVF1ZXN0aW9uLmRpc2FibGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBxdWVzdGlvbi5kaXNhYmxlID0gc2NoZW1hUXVlc3Rpb24uZGlzYWJsZS5kaXNhYmxlV2hlbkV4cHJlc3Npb247XG4gICAgfVxuXG4gICAgaWYgKCEhc2NoZW1hUXVlc3Rpb24uaGlkZSkge1xuICAgICAgcXVlc3Rpb24uaGlkZSA9IHNjaGVtYVF1ZXN0aW9uLmhpZGU7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygc2NoZW1hUXVlc3Rpb24uaGlkZSA9PT0gJ29iamVjdCcpIHtcblxuICAgICAgaWYgKHNjaGVtYVF1ZXN0aW9uLmhpZGUuaGlkZVdoZW5FeHByZXNzaW9uKSB7XG4gICAgICAgIHF1ZXN0aW9uLmhpZGUgPSBzY2hlbWFRdWVzdGlvbi5oaWRlLmhpZGVXaGVuRXhwcmVzc2lvbjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBnZW5lcmF0ZUlkKHgpIHtcbiAgICBsZXQgcyA9ICdfJztcbiAgICB3aGlsZSAocy5sZW5ndGggPCB4ICYmIHggPiAwKSB7XG4gICAgICBjb25zdCByID0gTWF0aC5yYW5kb20oKTtcbiAgICAgIHMgKz0gKHIgPCAwLjEgPyBNYXRoLmZsb29yKHIgKiAxMDApIDpcbiAgICAgICAgU3RyaW5nLmZyb21DaGFyQ29kZShNYXRoLmZsb29yKHIgKiAyNikgKyAociA+IDAuNSA/IDk3IDogNjUpKSk7XG4gICAgfVxuICAgIHJldHVybiAnXycgKyBzO1xuICB9XG59XG4iXX0=