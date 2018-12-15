/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ArrayNode } from '../form-factory/form-node';
import { ControlRelationsFactory } from '../form-factory/control-relations.factory';
import * as moment_ from 'moment';
/** @type {?} */
const moment = moment_;
export class ExpressionRunner {
    /**
     * @param {?} expression
     * @param {?} control
     * @param {?} helper
     * @param {?} dataDependencies
     * @param {?=} form
     * @return {?}
     */
    getRunnable(expression, control, helper, dataDependencies, form) {
        /** @type {?} */
        const runner = this;
        /** @type {?} */
        const runnable = {
            run: () => {
                /* tslint:disable */
                /** @type {?} */
                let scope = {};
                if (control.uuid) {
                    scope[control.uuid] = control.value;
                }
                window['moment'] = moment;
                // scope.moment = moment;
                scope['myValue'] = control.value;
                runner.getControlRelationValueString(control, scope);
                runner.getHelperMethods(helper, scope);
                runner.getDataDependencies(dataDependencies, scope);
                if (form) {
                    // console.error('Form defined', form);
                    runner.getDataDependencies(form.dataSourcesContainer.dataSources, scope);
                }
                /** @type {?} */
                let paramList = '';
                /** @type {?} */
                let argList = '';
                for (let o in scope) {
                    paramList = paramList === "" ? paramList + o : paramList + ',' + o;
                    argList = argList === "" ? argList + "scope['" + o + "']" : argList + ",scope['" + o + "']";
                }
                // prevent more than one return statements
                if (expression.indexOf('return') === -1) {
                    expression = '"return ' + expression + '"';
                }
                /** @type {?} */
                let funcDeclarationCode = 'var afeDynamicFunc = new Function("' + paramList + '", ' + expression + ');';
                /** @type {?} */
                let funcCallCode = 'afeDynamicFunc.call(this ' + (argList === '' ? '' : ',' + argList) + ');';
                try {
                    if (Object.keys(scope).indexOf('undefined') >= 0) {
                        console.warn('Missing reference found', expression, scope);
                        return false;
                    }
                    //console.info('results: ', expression, eval(funcDeclarationCode + funcCallCode));
                    return eval(funcDeclarationCode + funcCallCode);
                }
                catch (e) {
                    // if (window['error_count']) {
                    //     window['error_count'] = window['error_count'] + 1;
                    // } else {
                    //     window['error_count'] = 1;
                    // }
                    // console.error(window['error_count'] + ' Error running expression:' + expression + '. ',
                    //     e, control, 'Effective Expression', (funcDeclarationCode + funcCallCode));
                    // console.error('Error running expression:' + expression + '. ',
                    //     e, control, 'Effective Expression', (funcDeclarationCode + funcCallCode));
                    // Uncomment the line above during debugging
                    // console.error('Error running expression:' + expression, scope);
                    return false;
                }
                /* tslint:enable */
            }
        };
        return runnable;
    }
    /**
     * @private
     * @param {?} control
     * @param {?} scope
     * @return {?}
     */
    getControlRelationValueString(control, scope) {
        if (control && control.controlRelations && control.controlRelations.relations) {
            control.controlRelations.relations.forEach(relation => {
                if (relation.relatedTo) {
                    /** @type {?} */
                    const related = (/** @type {?} */ (relation.relatedTo));
                    /** @type {?} */
                    const relatedAsControl = (/** @type {?} */ (relation.relatedTo));
                    if (relatedAsControl && Array.isArray(relatedAsControl.value)) {
                        scope[related.uuid] = relation.relatedTo.value;
                    }
                    else {
                        scope[related.uuid] = relation.relatedTo.value && relation.relatedTo.value.value ?
                            relation.relatedTo.value.value : relation.relatedTo.value;
                    }
                }
            });
        }
        if (control && control.controlRelations && control.controlRelations.otherRelations
            && control.controlRelations.otherRelations.length > 0) {
            control.controlRelations.otherRelations.forEach(node => {
                if (node instanceof ArrayNode) {
                    /** @type {?} */
                    const arrayNode = (/** @type {?} */ (node));
                    /** @type {?} */
                    const uuid = control.uuid;
                    /** @type {?} */
                    const controlRelationsFactory = new ControlRelationsFactory();
                    /** @type {?} */
                    let relationsForControl = [];
                    // get all related controls
                    arrayNode.children.forEach(child => {
                        relationsForControl = relationsForControl.concat(controlRelationsFactory.getRelationsForControl(uuid, child));
                    });
                    this.setControlArrayValues((/** @type {?} */ (control)), relationsForControl, scope);
                }
            });
        }
    }
    /**
     * @private
     * @param {?} control
     * @param {?} relationsForControl
     * @param {?} scope
     * @return {?}
     */
    setControlArrayValues(control, relationsForControl, scope) {
        /** @type {?} */
        const keys = this._getFormControlKeys(relationsForControl);
        keys.forEach(key => {
            /** @type {?} */
            const values = this._getValuesForKey(key, relationsForControl);
            scope[key] = values;
        });
    }
    /**
     * @private
     * @param {?} array
     * @return {?}
     */
    _getFormControlKeys(array) {
        /** @type {?} */
        const keys = [];
        array.forEach(control => {
            if (keys.indexOf(control.uuid) === -1) {
                keys.push(control.uuid);
            }
        });
        return keys;
    }
    /**
     * @private
     * @param {?} key
     * @param {?} array
     * @return {?}
     */
    _getValuesForKey(key, array) {
        /** @type {?} */
        const values = [];
        array.forEach(control => {
            if (control.uuid === key) {
                values.push(control.value);
            }
        });
        return values;
    }
    /**
     * @private
     * @param {?} obj
     * @param {?=} scope
     * @return {?}
     */
    getHelperMethods(obj, scope) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                scope[key] = obj[key];
            }
        }
    }
    /**
     * @private
     * @param {?} obj
     * @param {?=} scope
     * @return {?}
     */
    getDataDependencies(obj, scope) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                scope[key] = obj[key];
            }
        }
    }
}
/**
 * @record
 */
export function Runnable() { }
if (false) {
    /**
     * @return {?}
     */
    Runnable.prototype.run = function () { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzc2lvbi1ydW5uZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2V4cHJlc3Npb24tcnVubmVyL2V4cHJlc3Npb24tcnVubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdEQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFFcEYsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7O01BRTVCLE1BQU0sR0FBRyxPQUFPO0FBQ3RCLE1BQU0sT0FBTyxnQkFBZ0I7Ozs7Ozs7OztJQUN6QixXQUFXLENBQUMsVUFBa0IsRUFBRSxPQUFxRCxFQUNqRixNQUFXLEVBQUUsZ0JBQXFCLEVBQUUsSUFBVzs7Y0FFekMsTUFBTSxHQUFHLElBQUk7O2NBQ2IsUUFBUSxHQUFhO1lBQ3ZCLEdBQUcsRUFBRSxHQUFHLEVBQUU7OztvQkFHRixLQUFLLEdBQVEsRUFBRTtnQkFDbkIsSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFO29CQUNkLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztpQkFDdkM7Z0JBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLE1BQU0sQ0FBQztnQkFDMUIseUJBQXlCO2dCQUN6QixLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDakMsTUFBTSxDQUFDLDZCQUE2QixDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDckQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDdkMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUVwRCxJQUFJLElBQUksRUFBRTtv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Ozs7Ozs7O0lBRU8sbUJBQW1CLENBQUMsR0FBUSxFQUFFLEtBQVc7UUFDN0MsS0FBSyxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUU7WUFDbkIsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN6QixLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3pCO1NBQ0o7SUFDTCxDQUFDO0NBQ0o7Ozs7QUFFRCw4QkFFQzs7Ozs7SUFERyx5Q0FBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEFmZUZvcm1Db250cm9sLCBBZmVGb3JtQXJyYXksIEFmZUZvcm1Hcm91cCB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9jb250cm9sLWV4dGVuc2lvbnMnO1xuaW1wb3J0IHsgQXJyYXlOb2RlIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0tbm9kZSc7XG5pbXBvcnQgeyBDb250cm9sUmVsYXRpb25zRmFjdG9yeSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS9jb250cm9sLXJlbGF0aW9ucy5mYWN0b3J5JztcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvZm9ybSc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5leHBvcnQgY2xhc3MgRXhwcmVzc2lvblJ1bm5lciB7XG4gICAgZ2V0UnVubmFibGUoZXhwcmVzc2lvbjogc3RyaW5nLCBjb250cm9sOiBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAgfCBBZmVGb3JtQ29udHJvbCxcbiAgICAgICAgaGVscGVyOiBhbnksIGRhdGFEZXBlbmRlbmNpZXM6IGFueSwgZm9ybT86IEZvcm0pOlxuICAgICAgICBSdW5uYWJsZSB7XG4gICAgICAgIGNvbnN0IHJ1bm5lciA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHJ1bm5hYmxlOiBSdW5uYWJsZSA9IHtcbiAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLyogdHNsaW50OmRpc2FibGUgKi9cbiAgICAgICAgICAgICAgICBsZXQgc2NvcGU6IGFueSA9IHt9O1xuICAgICAgICAgICAgICAgIGlmIChjb250cm9sLnV1aWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGVbY29udHJvbC51dWlkXSA9IGNvbnRyb2wudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdpbmRvd1snbW9tZW50J10gPSBtb21lbnQ7XG4gICAgICAgICAgICAgICAgLy8gc2NvcGUubW9tZW50ID0gbW9tZW50O1xuICAgICAgICAgICAgICAgIHNjb3BlWydteVZhbHVlJ10gPSBjb250cm9sLnZhbHVlO1xuICAgICAgICAgICAgICAgIHJ1bm5lci5nZXRDb250cm9sUmVsYXRpb25WYWx1ZVN0cmluZyhjb250cm9sLCBzY29wZSk7XG4gICAgICAgICAgICAgICAgcnVubmVyLmdldEhlbHBlck1ldGhvZHMoaGVscGVyLCBzY29wZSk7XG4gICAgICAgICAgICAgICAgcnVubmVyLmdldERhdGFEZXBlbmRlbmNpZXMoZGF0YURlcGVuZGVuY2llcywgc2NvcGUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZvcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcignRm9ybSBkZWZpbmVkJywgZm9ybSk7XG4gICAgICAgICAgICAgICAgICAgIHJ1bm5lci5nZXREYXRhRGVwZW5kZW5jaWVzKGZvcm0uZGF0YVNvdXJjZXNDb250YWluZXIuZGF0YVNvdXJjZXMsIHNjb3BlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgcGFyYW1MaXN0ID0gJyc7XG4gICAgICAgICAgICAgICAgbGV0IGFyZ0xpc3QgPSAnJztcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBvIGluIHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtTGlzdCA9IHBhcmFtTGlzdCA9PT0gXCJcIiA/IHBhcmFtTGlzdCArIG8gOiBwYXJhbUxpc3QgKyAnLCcgKyBvO1xuICAgICAgICAgICAgICAgICAgICBhcmdMaXN0ID0gYXJnTGlzdCA9PT0gXCJcIiA/IGFyZ0xpc3QgKyBcInNjb3BlWydcIiArIG8gKyBcIiddXCIgOiBhcmdMaXN0ICsgXCIsc2NvcGVbJ1wiICsgbyArIFwiJ11cIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBwcmV2ZW50IG1vcmUgdGhhbiBvbmUgcmV0dXJuIHN0YXRlbWVudHNcbiAgICAgICAgICAgICAgICBpZiAoZXhwcmVzc2lvbi5pbmRleE9mKCdyZXR1cm4nKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbiA9ICdcInJldHVybiAnICsgZXhwcmVzc2lvbiArICdcIic7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGZ1bmNEZWNsYXJhdGlvbkNvZGUgPSAndmFyIGFmZUR5bmFtaWNGdW5jID0gbmV3IEZ1bmN0aW9uKFwiJyArIHBhcmFtTGlzdCArICdcIiwgJyArIGV4cHJlc3Npb24gKyAnKTsnO1xuICAgICAgICAgICAgICAgIGxldCBmdW5jQ2FsbENvZGUgPSAnYWZlRHluYW1pY0Z1bmMuY2FsbCh0aGlzICcgKyAoYXJnTGlzdCA9PT0gJycgPyAnJyA6ICcsJyArIGFyZ0xpc3QpICsgJyk7JztcblxuICAgICAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHNjb3BlKS5pbmRleE9mKCd1bmRlZmluZWQnKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ01pc3NpbmcgcmVmZXJlbmNlIGZvdW5kJywgZXhwcmVzc2lvbiwgc2NvcGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5pbmZvKCdyZXN1bHRzOiAnLCBleHByZXNzaW9uLCBldmFsKGZ1bmNEZWNsYXJhdGlvbkNvZGUgKyBmdW5jQ2FsbENvZGUpKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2YWwoZnVuY0RlY2xhcmF0aW9uQ29kZSArIGZ1bmNDYWxsQ29kZSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiAod2luZG93WydlcnJvcl9jb3VudCddKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB3aW5kb3dbJ2Vycm9yX2NvdW50J10gPSB3aW5kb3dbJ2Vycm9yX2NvdW50J10gKyAxO1xuICAgICAgICAgICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgd2luZG93WydlcnJvcl9jb3VudCddID0gMTtcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKHdpbmRvd1snZXJyb3JfY291bnQnXSArICcgRXJyb3IgcnVubmluZyBleHByZXNzaW9uOicgKyBleHByZXNzaW9uICsgJy4gJyxcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGUsIGNvbnRyb2wsICdFZmZlY3RpdmUgRXhwcmVzc2lvbicsIChmdW5jRGVjbGFyYXRpb25Db2RlICsgZnVuY0NhbGxDb2RlKSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHJ1bm5pbmcgZXhwcmVzc2lvbjonICsgZXhwcmVzc2lvbiArICcuICcsXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBlLCBjb250cm9sLCAnRWZmZWN0aXZlIEV4cHJlc3Npb24nLCAoZnVuY0RlY2xhcmF0aW9uQ29kZSArIGZ1bmNDYWxsQ29kZSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFVuY29tbWVudCB0aGUgbGluZSBhYm92ZSBkdXJpbmcgZGVidWdnaW5nXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHJ1bm5pbmcgZXhwcmVzc2lvbjonICsgZXhwcmVzc2lvbiwgc2NvcGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLyogdHNsaW50OmVuYWJsZSAqL1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcnVubmFibGU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDb250cm9sUmVsYXRpb25WYWx1ZVN0cmluZyhjb250cm9sOiBBZmVGb3JtQXJyYXkgfCBBZmVGb3JtR3JvdXAgfCBBZmVGb3JtQ29udHJvbCwgc2NvcGU6IGFueSkge1xuICAgICAgICBpZiAoY29udHJvbCAmJiBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMgJiYgY29udHJvbC5jb250cm9sUmVsYXRpb25zLnJlbGF0aW9ucykge1xuICAgICAgICAgICAgY29udHJvbC5jb250cm9sUmVsYXRpb25zLnJlbGF0aW9ucy5mb3JFYWNoKHJlbGF0aW9uID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVsYXRpb24ucmVsYXRlZFRvKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlbGF0ZWQgPSByZWxhdGlvbi5yZWxhdGVkVG8gYXMgYW55O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWxhdGVkQXNDb250cm9sID0gcmVsYXRpb24ucmVsYXRlZFRvIGFzIEFic3RyYWN0Q29udHJvbDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlbGF0ZWRBc0NvbnRyb2wgJiYgQXJyYXkuaXNBcnJheShyZWxhdGVkQXNDb250cm9sLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGVbcmVsYXRlZC51dWlkXSA9IHJlbGF0aW9uLnJlbGF0ZWRUby52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlW3JlbGF0ZWQudXVpZF0gPSByZWxhdGlvbi5yZWxhdGVkVG8udmFsdWUgJiYgcmVsYXRpb24ucmVsYXRlZFRvLnZhbHVlLnZhbHVlID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWxhdGlvbi5yZWxhdGVkVG8udmFsdWUudmFsdWUgOiByZWxhdGlvbi5yZWxhdGVkVG8udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250cm9sICYmIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucyAmJiBjb250cm9sLmNvbnRyb2xSZWxhdGlvbnMub3RoZXJSZWxhdGlvbnNcbiAgICAgICAgICAgICYmIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5vdGhlclJlbGF0aW9ucy5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgIGNvbnRyb2wuY29udHJvbFJlbGF0aW9ucy5vdGhlclJlbGF0aW9ucy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgQXJyYXlOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFycmF5Tm9kZTogQXJyYXlOb2RlID0gbm9kZSBhcyBBcnJheU5vZGU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHV1aWQgPSBjb250cm9sLnV1aWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udHJvbFJlbGF0aW9uc0ZhY3Rvcnk6IENvbnRyb2xSZWxhdGlvbnNGYWN0b3J5ID0gbmV3IENvbnRyb2xSZWxhdGlvbnNGYWN0b3J5KCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZWxhdGlvbnNGb3JDb250cm9sOiBBcnJheTxBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheT4gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IGFsbCByZWxhdGVkIGNvbnRyb2xzXG4gICAgICAgICAgICAgICAgICAgIGFycmF5Tm9kZS5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aW9uc0ZvckNvbnRyb2wgPSByZWxhdGlvbnNGb3JDb250cm9sLmNvbmNhdChjb250cm9sUmVsYXRpb25zRmFjdG9yeS5nZXRSZWxhdGlvbnNGb3JDb250cm9sKHV1aWQsIGNoaWxkKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRDb250cm9sQXJyYXlWYWx1ZXMoY29udHJvbCBhcyBBZmVGb3JtQ29udHJvbCB8IEFmZUZvcm1BcnJheSwgcmVsYXRpb25zRm9yQ29udHJvbCwgc2NvcGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRDb250cm9sQXJyYXlWYWx1ZXMoY29udHJvbDogQWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXksXG4gICAgICAgIHJlbGF0aW9uc0ZvckNvbnRyb2w6IEFycmF5PEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5Piwgc2NvcGU6IGFueSkge1xuICAgICAgICBjb25zdCBrZXlzOiBBcnJheTxzdHJpbmc+ID0gdGhpcy5fZ2V0Rm9ybUNvbnRyb2xLZXlzKHJlbGF0aW9uc0ZvckNvbnRyb2wpO1xuXG4gICAgICAgIGtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWVzOiBhbnkgPSB0aGlzLl9nZXRWYWx1ZXNGb3JLZXkoa2V5LCByZWxhdGlvbnNGb3JDb250cm9sKTtcbiAgICAgICAgICAgIHNjb3BlW2tleV0gPSB2YWx1ZXM7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldEZvcm1Db250cm9sS2V5cyhhcnJheTogQXJyYXk8QWZlRm9ybUNvbnRyb2wgfCBBZmVGb3JtQXJyYXk+KTogQXJyYXk8c3RyaW5nPiB7XG5cbiAgICAgICAgY29uc3Qga2V5czogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICAgICAgICBhcnJheS5mb3JFYWNoKGNvbnRyb2wgPT4ge1xuXG4gICAgICAgICAgICBpZiAoa2V5cy5pbmRleE9mKGNvbnRyb2wudXVpZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAga2V5cy5wdXNoKGNvbnRyb2wudXVpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBrZXlzO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldFZhbHVlc0ZvcktleShrZXk6IHN0cmluZywgYXJyYXk6IEFycmF5PEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5Pik6IGFueSB7XG4gICAgICAgIGNvbnN0IHZhbHVlczogYW55ID0gW107XG5cbiAgICAgICAgYXJyYXkuZm9yRWFjaChjb250cm9sID0+IHtcblxuICAgICAgICAgICAgaWYgKGNvbnRyb2wudXVpZCA9PT0ga2V5KSB7XG4gICAgICAgICAgICAgICAgdmFsdWVzLnB1c2goY29udHJvbC52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRIZWxwZXJNZXRob2RzKG9iajogYW55LCBzY29wZT86IGFueSkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIHNjb3BlW2tleV0gPSBvYmpba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RGF0YURlcGVuZGVuY2llcyhvYmo6IGFueSwgc2NvcGU/OiBhbnkpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBzY29wZVtrZXldID0gb2JqW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUnVubmFibGUge1xuICAgIHJ1bigpO1xufVxuIl19