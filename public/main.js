(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /mnt/c/temp/blackthorn-assignment/client/src/main.ts */"zUnb");


/***/ }),

/***/ "59tN":
/*!********************************************************!*\
  !*** ./src/app/core/interceptors/token.interceptor.ts ***!
  \********************************************************/
/*! exports provided: TokenInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TokenInterceptor", function() { return TokenInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/services */ "ZF+8");



class TokenInterceptor {
    constructor(authService) {
        this.authService = authService;
    }
    intercept(req, next) {
        if (this.authService.credentials) {
            let authorization = `Bearer ${this.authService.credentials.token}`;
            const isAuth = this.authService.credentials.type === null ||
                this.authService.credentials.type === undefined;
            if (!isAuth) {
                authorization = authorization.replace(/^/, this.authService.credentials.type);
            }
            req = req.clone({
                setHeaders: {
                    'Access-Control-Allow-Origin': '*',
                    Authorization: authorization
                }
            });
        }
        return next.handle(req);
    }
}
TokenInterceptor.ɵfac = function TokenInterceptor_Factory(t) { return new (t || TokenInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_shared_services__WEBPACK_IMPORTED_MODULE_1__["AuthenticationService"])); };
TokenInterceptor.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: TokenInterceptor, factory: TokenInterceptor.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TokenInterceptor, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }], function () { return [{ type: _shared_services__WEBPACK_IMPORTED_MODULE_1__["AuthenticationService"] }]; }, null); })();


/***/ }),

/***/ "6H+C":
/*!********************************************!*\
  !*** ./src/app/core/interceptors/index.ts ***!
  \********************************************/
/*! exports provided: ApiPrefixInterceptor, LoaderInterceptor, ErrorHandlerInterceptor, TokenInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_prefix_interceptor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api-prefix.interceptor */ "wndk");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApiPrefixInterceptor", function() { return _api_prefix_interceptor__WEBPACK_IMPORTED_MODULE_0__["ApiPrefixInterceptor"]; });

/* harmony import */ var _loader_interceptor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loader.interceptor */ "D/SK");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LoaderInterceptor", function() { return _loader_interceptor__WEBPACK_IMPORTED_MODULE_1__["LoaderInterceptor"]; });

/* harmony import */ var _error_handler_interceptor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./error-handler.interceptor */ "fbaV");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ErrorHandlerInterceptor", function() { return _error_handler_interceptor__WEBPACK_IMPORTED_MODULE_2__["ErrorHandlerInterceptor"]; });

/* harmony import */ var _token_interceptor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./token.interceptor */ "59tN");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TokenInterceptor", function() { return _token_interceptor__WEBPACK_IMPORTED_MODULE_3__["TokenInterceptor"]; });







/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "CeUM":
/*!*******************************************************!*\
  !*** ./src/app/shared/services/enviroment.service.ts ***!
  \*******************************************************/
/*! exports provided: EnvironmentService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnvironmentService", function() { return EnvironmentService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class EnvironmentService {
    get baseUrl() {
        return this.BASE_URL;
    }
}
EnvironmentService.ɵfac = function EnvironmentService_Factory(t) { return new (t || EnvironmentService)(); };
EnvironmentService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: EnvironmentService, factory: EnvironmentService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](EnvironmentService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }], null, null); })();


/***/ }),

/***/ "D/SK":
/*!*********************************************************!*\
  !*** ./src/app/core/interceptors/loader.interceptor.ts ***!
  \*********************************************************/
/*! exports provided: LoaderInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoaderInterceptor", function() { return LoaderInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _shared_services_loader_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/services/loader.service */ "cxgq");




class LoaderInterceptor {
    constructor(loaderService) {
        this.loaderService = loaderService;
    }
    intercept(req, next) {
        this.showOverlay();
        return next.handle(req).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["finalize"])(() => {
            this.disposeRef();
        }));
    }
    showOverlay() {
        return this.loaderService.open();
    }
    disposeRef() {
        this.loaderService.close();
    }
}
LoaderInterceptor.ɵfac = function LoaderInterceptor_Factory(t) { return new (t || LoaderInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_shared_services_loader_service__WEBPACK_IMPORTED_MODULE_2__["LoaderService"])); };
LoaderInterceptor.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: LoaderInterceptor, factory: LoaderInterceptor.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoaderInterceptor, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }], function () { return [{ type: _shared_services_loader_service__WEBPACK_IMPORTED_MODULE_2__["LoaderService"] }]; }, null); })();


/***/ }),

/***/ "DFKd":
/*!******************************************************************************!*\
  !*** ./src/app/shared/components/spinner-loader/spinner-loader.component.ts ***!
  \******************************************************************************/
/*! exports provided: SpinnerLoaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpinnerLoaderComponent", function() { return SpinnerLoaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var ng_zorro_antd_spin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ng-zorro-antd/spin */ "qAZ0");



class SpinnerLoaderComponent {
    constructor() { }
    ngOnInit() {
    }
}
SpinnerLoaderComponent.ɵfac = function SpinnerLoaderComponent_Factory(t) { return new (t || SpinnerLoaderComponent)(); };
SpinnerLoaderComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SpinnerLoaderComponent, selectors: [["app-spinner-loader"]], inputs: { diameter: "diameter" }, decls: 3, vars: 1, consts: [[1, "spinner-loader-container", "w-full", "h-full"], [1, "overlay", "absolute", "left-50", "top-50"], ["nzSimple", "", 3, "nzSize"]], template: function SpinnerLoaderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "nz-spin", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzSize", "large");
    } }, directives: [ng_zorro_antd_spin__WEBPACK_IMPORTED_MODULE_1__["NzSpinComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL3NwaW5uZXItbG9hZGVyL3NwaW5uZXItbG9hZGVyLmNvbXBvbmVudC5zY3NzIn0= */"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SpinnerLoaderComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-spinner-loader',
                templateUrl: './spinner-loader.component.html',
                styleUrls: ['./spinner-loader.component.scss']
            }]
    }], function () { return []; }, { diameter: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "FXLl":
/*!*************************************************!*\
  !*** ./src/app/shared/services/base.service.ts ***!
  \*************************************************/
/*! exports provided: BaseService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseService", function() { return BaseService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");





class BaseService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.httpHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]();
        this.httpOptions = {};
        this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-cache'
            })
        };
        this.httpHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"](this.httpOptions);
    }
    static extractData(response) {
        const responseData = response;
        console.log(responseData);
        if (!responseData) {
            return {};
        }
        if (!responseData.success) {
            throw new Error(responseData.message);
        }
        return responseData.data;
    }
    get(uri, params) {
        return this.httpClient
            .get(uri, { headers: this.httpHeaders, params })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(BaseService.extractData));
    }
    // api post method
    post(uri, data, params) {
        return this.httpClient
            .post(uri, data, {
            headers: this.httpHeaders,
            params
        })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(BaseService.extractData));
    }
    // api put method
    put(uri, data, params) {
        return this.httpClient
            .put(uri, data, {
            headers: this.httpHeaders,
            params
        })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(BaseService.extractData));
    }
    // api delete method
    delete(uri, params) {
        return this.httpClient
            .delete(`${uri}`, {
            headers: this.httpHeaders,
            params
        })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(BaseService.extractData));
    }
}
BaseService.ɵfac = function BaseService_Factory(t) { return new (t || BaseService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
BaseService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: BaseService, factory: BaseService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](BaseService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "MGpm":
/*!*****************************************************!*\
  !*** ./src/app/core/guards/authentication.guard.ts ***!
  \*****************************************************/
/*! exports provided: AuthenticationGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationGuard", function() { return AuthenticationGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _shared_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services */ "ZF+8");





class AuthenticationGuard {
    constructor(router, authenticationService) {
        this.router = router;
        this.authenticationService = authenticationService;
    }
    canActivate(next, state) {
        if (this.authenticationService.isAuthenticated) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(true);
        }
        this.router.navigate(['/auth/login']).then();
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(true);
    }
    canActivateChild(route, state) {
        return true;
    }
}
AuthenticationGuard.ɵfac = function AuthenticationGuard_Factory(t) { return new (t || AuthenticationGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_shared_services__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"])); };
AuthenticationGuard.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AuthenticationGuard, factory: AuthenticationGuard.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AuthenticationGuard, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }, { type: _shared_services__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"] }]; }, null); })();


/***/ }),

/***/ "MZth":
/*!**************************************!*\
  !*** ./src/app/core/utils/helper.ts ***!
  \**************************************/
/*! exports provided: fmt, isEmpty, isNotEmpty, mapToHttpParamsQuery, mapToFormData, removeTheFirstChar, removeTheLastChar, isString, deepCopyObject, convertToInt, convertToCurrency */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fmt", function() { return fmt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmpty", function() { return isEmpty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNotEmpty", function() { return isNotEmpty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapToHttpParamsQuery", function() { return mapToHttpParamsQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapToFormData", function() { return mapToFormData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeTheFirstChar", function() { return removeTheFirstChar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeTheLastChar", function() { return removeTheLastChar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isString", function() { return isString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deepCopyObject", function() { return deepCopyObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertToInt", function() { return convertToInt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertToCurrency", function() { return convertToCurrency; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");

function fmt(text, myHash) {
    let key;
    // tslint:disable-next-line: forin
    for (key in myHash) {
        text = text.replace(new RegExp('\\{' + key + '\\}', 'gm'), myHash[key]);
    }
    return text;
}
function isEmpty(args) {
    return (args === null || args === undefined || args === ''
        || args.length === 0 || args === 'null' || args === 'undefined');
}
function isNotEmpty(args) {
    return !isEmpty(args);
}
// tslint:disable-next-line: ban-types
function mapToHttpParamsQuery(params) {
    let httpParams = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpParams"]();
    for (const property in params) {
        if (params.hasOwnProperty(property) && isNotEmpty(params[property])) {
            httpParams = httpParams.set(property, params[property]);
        }
    }
    return httpParams;
}
function mapToFormData(body) {
    const formData = new FormData();
    for (const property in body) {
        if (body.hasOwnProperty(property) && isNotEmpty(body[property])) {
            formData.append(property, body[property]);
        }
    }
    return formData;
}
function removeTheFirstChar(args) {
    if (isEmpty(args)) {
        return '';
    }
    return args.substring(1, args.length);
}
function removeTheLastChar(args) {
    if (isEmpty(args)) {
        return '';
    }
    return args.substring(0, args.length - 1);
}
function isString(object) {
    return typeof object === 'string';
}
function deepCopyObject(source, target) {
    Object.keys(source).forEach((property) => {
        target[property] = source[property];
    });
}
function convertToInt(d) {
    return Math.floor(d);
}
function convertToCurrency(d) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    return formatter.format(d);
}


/***/ }),

/***/ "Sc3e":
/*!*******************************************************!*\
  !*** ./src/app/core/providers/enviroment.provider.ts ***!
  \*******************************************************/
/*! exports provided: EnvironmentServiceFactory, EnvironmentServiceProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnvironmentServiceFactory", function() { return EnvironmentServiceFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnvironmentServiceProvider", function() { return EnvironmentServiceProvider; });
/* harmony import */ var _approot_shared_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @approot/shared/services */ "ZF+8");

const EnvironmentServiceFactory = () => {
    const environment = new _approot_shared_services__WEBPACK_IMPORTED_MODULE_0__["EnvironmentService"]();
    const env = 'environment';
    const browserWindowEnvironment = window[env] || {};
    for (const key in browserWindowEnvironment) {
        if (browserWindowEnvironment.hasOwnProperty(key)) {
            environment[key] = browserWindowEnvironment[key];
        }
    }
    return environment;
};
const EnvironmentServiceProvider = {
    provide: _approot_shared_services__WEBPACK_IMPORTED_MODULE_0__["EnvironmentService"],
    useFactory: EnvironmentServiceFactory,
    deps: []
};


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dayjs/plugin/relativeTime */ "QgiU");
/* harmony import */ var dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dayjs */ "Wgwc");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _shared_components_spinner_loader_spinner_loader_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shared/components/spinner-loader/spinner-loader.component */ "DFKd");







class AppComponent {
    constructor(router) {
        this.router = router;
        this.loading = false;
        this.loading = true;
        dayjs__WEBPACK_IMPORTED_MODULE_3__["extend"](dayjs_plugin_relativeTime__WEBPACK_IMPORTED_MODULE_2__);
    }
    ngAfterViewInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationEnd"] || event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationCancel"]) {
                this.loading = false;
            }
        });
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"])); };
AppComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 4, vars: 2, consts: [[1, "app-layout"], [3, "hidden"], [1, "router-output", 3, "hidden"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-spinner-loader", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hidden", !ctx.loading);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hidden", ctx.loading);
    } }, directives: [_shared_components_spinner_loader_spinner_loader_component__WEBPACK_IMPORTED_MODULE_4__["SpinnerLoaderComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: [".app-layout[_ngcontent-%COMP%] {\n  height: 100vh;\n  width: 100vw;\n}\n.app-layout[_ngcontent-%COMP%]   .router-output[_ngcontent-%COMP%] {\n  height: 100vh;\n  width: 100vw;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLFlBQUE7QUFDRjtBQUFFO0VBQ0UsYUFBQTtFQUNBLFlBQUE7QUFFSiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hcHAtbGF5b3V0IHtcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgd2lkdGg6IDEwMHZ3O1xuICAucm91dGVyLW91dHB1dCB7XG4gICAgaGVpZ2h0OiAxMDB2aDtcbiAgICB3aWR0aDogMTAwdnc7XG4gIH1cbn1cbiJdfQ== */"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.scss']
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }]; }, null); })();


/***/ }),

/***/ "TLzw":
/*!*****************************************************!*\
  !*** ./src/app/notification/notification.module.ts ***!
  \*****************************************************/
/*! exports provided: NotificationModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationModule", function() { return NotificationModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _notification_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notification.service */ "blnF");
/* harmony import */ var ng_zorro_antd_notification__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng-zorro-antd/notification */ "bNXi");





class NotificationModule {
}
NotificationModule.ɵfac = function NotificationModule_Factory(t) { return new (t || NotificationModule)(); };
NotificationModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: NotificationModule });
NotificationModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ providers: [
        _notification_service__WEBPACK_IMPORTED_MODULE_2__["NotificationService"]
    ], imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            ng_zorro_antd_notification__WEBPACK_IMPORTED_MODULE_3__["NzNotificationModule"]
        ]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NotificationModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    ng_zorro_antd_notification__WEBPACK_IMPORTED_MODULE_3__["NzNotificationModule"]
                ],
                providers: [
                    _notification_service__WEBPACK_IMPORTED_MODULE_2__["NotificationService"]
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](NotificationModule, { imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        ng_zorro_antd_notification__WEBPACK_IMPORTED_MODULE_3__["NzNotificationModule"]] }); })();


/***/ }),

/***/ "TTF2":
/*!***********************************************************!*\
  !*** ./src/app/shared/services/authentication.service.ts ***!
  \***********************************************************/
/*! exports provided: AuthenticationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationService", function() { return AuthenticationService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _credentials_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./credentials.service */ "sDBb");



class AuthenticationService {
    constructor(credentialsService) {
        this.credentialsService = credentialsService;
    }
    get isAuthenticated() {
        return !!this.credentialsService.isAuthenticated;
    }
    get credentials() {
        return this.credentialsService.getCredentials;
    }
    get email() {
        return this.credentialsService.email;
    }
    login(context, remember) {
        this.credentialsService.setCredentials(context, remember);
    }
    logout() {
        this.credentialsService.setCredentials(null);
    }
}
AuthenticationService.ɵfac = function AuthenticationService_Factory(t) { return new (t || AuthenticationService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_credentials_service__WEBPACK_IMPORTED_MODULE_1__["CredentialsService"])); };
AuthenticationService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AuthenticationService, factory: AuthenticationService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AuthenticationService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _credentials_service__WEBPACK_IMPORTED_MODULE_1__["CredentialsService"] }]; }, null); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var ng_zorro_antd_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng-zorro-antd/i18n */ "Rm4T");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_common_locales_en__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/locales/en */ "tAZD");
/* harmony import */ var _angular_common_locales_en__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_angular_common_locales_en__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _approot_shared_components_spinner_loader_spinner_loader_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @approot/shared/components/spinner-loader/spinner-loader.module */ "seby");
/* harmony import */ var _approot_core_core_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @approot/core/core.module */ "pKmL");
/* harmony import */ var _approot_notification_notification_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @approot/notification/notification.module */ "TLzw");













Object(_angular_common__WEBPACK_IMPORTED_MODULE_7__["registerLocaleData"])(_angular_common_locales_en__WEBPACK_IMPORTED_MODULE_8___default.a);
class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ providers: [{ provide: ng_zorro_antd_i18n__WEBPACK_IMPORTED_MODULE_6__["NZ_I18N"], useValue: ng_zorro_antd_i18n__WEBPACK_IMPORTED_MODULE_6__["en_US"] }], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"],
            _approot_shared_components_spinner_loader_spinner_loader_module__WEBPACK_IMPORTED_MODULE_9__["SpinnerLoaderModule"],
            _approot_core_core_module__WEBPACK_IMPORTED_MODULE_10__["CoreModule"],
            _approot_notification_notification_module__WEBPACK_IMPORTED_MODULE_11__["NotificationModule"]
        ]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"],
                    _approot_shared_components_spinner_loader_spinner_loader_module__WEBPACK_IMPORTED_MODULE_9__["SpinnerLoaderModule"],
                    _approot_core_core_module__WEBPACK_IMPORTED_MODULE_10__["CoreModule"],
                    _approot_notification_notification_module__WEBPACK_IMPORTED_MODULE_11__["NotificationModule"]
                ],
                providers: [{ provide: ng_zorro_antd_i18n__WEBPACK_IMPORTED_MODULE_6__["NZ_I18N"], useValue: ng_zorro_antd_i18n__WEBPACK_IMPORTED_MODULE_6__["en_US"] }],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"],
        _approot_shared_components_spinner_loader_spinner_loader_module__WEBPACK_IMPORTED_MODULE_9__["SpinnerLoaderModule"],
        _approot_core_core_module__WEBPACK_IMPORTED_MODULE_10__["CoreModule"],
        _approot_notification_notification_module__WEBPACK_IMPORTED_MODULE_11__["NotificationModule"]] }); })();


/***/ }),

/***/ "ZF+8":
/*!******************************************!*\
  !*** ./src/app/shared/services/index.ts ***!
  \******************************************/
/*! exports provided: AuthenticationApiService, AuthenticationService, BaseService, CURRENT_USER, CredentialsService, LogLevel, Logger, EnvironmentService, UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _authentication_api_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./authentication-api.service */ "hU7O");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthenticationApiService", function() { return _authentication_api_service__WEBPACK_IMPORTED_MODULE_0__["AuthenticationApiService"]; });

/* harmony import */ var _authentication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authentication.service */ "TTF2");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthenticationService", function() { return _authentication_service__WEBPACK_IMPORTED_MODULE_1__["AuthenticationService"]; });

/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base.service */ "FXLl");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseService", function() { return _base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"]; });

/* harmony import */ var _credentials_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./credentials.service */ "sDBb");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CURRENT_USER", function() { return _credentials_service__WEBPACK_IMPORTED_MODULE_3__["CURRENT_USER"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CredentialsService", function() { return _credentials_service__WEBPACK_IMPORTED_MODULE_3__["CredentialsService"]; });

/* harmony import */ var _logger_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./logger.service */ "cpEJ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LogLevel", function() { return _logger_service__WEBPACK_IMPORTED_MODULE_4__["LogLevel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Logger", function() { return _logger_service__WEBPACK_IMPORTED_MODULE_4__["Logger"]; });

/* harmony import */ var _enviroment_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./enviroment.service */ "CeUM");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EnvironmentService", function() { return _enviroment_service__WEBPACK_IMPORTED_MODULE_5__["EnvironmentService"]; });

/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./user.service */ "kmKP");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return _user_service__WEBPACK_IMPORTED_MODULE_6__["UserService"]; });










/***/ }),

/***/ "blnF":
/*!******************************************************!*\
  !*** ./src/app/notification/notification.service.ts ***!
  \******************************************************/
/*! exports provided: NotificationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationService", function() { return NotificationService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var ng_zorro_antd_notification__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ng-zorro-antd/notification */ "bNXi");



class NotificationService {
    constructor(notification) {
        this.notification = notification;
        this.type = {
            info: 'info',
            success: 'success',
            warning: 'warning',
            error: 'error',
        };
    }
    showSuccess(title, content) {
        this.notification.create(this.type.success, title, content);
    }
    showWarning(title, content) {
        this.notification.create(this.type.warning, title, content);
    }
    showError(title, content) {
        this.notification.create(this.type.error, title, content);
    }
    showInfo(title, content) {
        this.notification.create(this.type.info, title, content);
    }
}
NotificationService.ɵfac = function NotificationService_Factory(t) { return new (t || NotificationService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](ng_zorro_antd_notification__WEBPACK_IMPORTED_MODULE_1__["NzNotificationService"])); };
NotificationService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: NotificationService, factory: NotificationService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NotificationService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }], function () { return [{ type: ng_zorro_antd_notification__WEBPACK_IMPORTED_MODULE_1__["NzNotificationService"] }]; }, null); })();


/***/ }),

/***/ "cpEJ":
/*!***************************************************!*\
  !*** ./src/app/shared/services/logger.service.ts ***!
  \***************************************************/
/*! exports provided: LogLevel, Logger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogLevel", function() { return LogLevel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Logger", function() { return Logger; });
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Off"] = 0] = "Off";
    LogLevel[LogLevel["Error"] = 1] = "Error";
    LogLevel[LogLevel["Warning"] = 2] = "Warning";
    LogLevel[LogLevel["Info"] = 3] = "Info";
    LogLevel[LogLevel["Debug"] = 4] = "Debug";
})(LogLevel || (LogLevel = {}));
class Logger {
    constructor(source) {
        this.source = source;
    }
    debug(...objects) {
        this.log(console.log, LogLevel.Debug, objects);
    }
    info(...objects) {
        this.log(console.log, LogLevel.Info, objects);
    }
    warn(...objects) {
        this.log(console.warn, LogLevel.Warning, objects);
    }
    error(...objects) {
        this.log(console.error, LogLevel.Error, objects);
    }
    log(func, level, objects) {
        if (level <= Logger.level) {
            const log = this.source
                ? ['[' + this.source + ']'].concat(objects)
                : objects;
            // func.apply(console, log);
            Logger.outputs.forEach((output) => output.apply(output, [this.source, level].concat(objects)));
        }
    }
}
Logger.level = LogLevel.Debug;
Logger.outputs = [];


/***/ }),

/***/ "cxgq":
/*!***************************************************!*\
  !*** ./src/app/shared/services/loader.service.ts ***!
  \***************************************************/
/*! exports provided: LoaderService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoaderService", function() { return LoaderService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/overlay */ "rDax");
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/portal */ "+rOU");
/* harmony import */ var _components_spinner_loader_spinner_loader_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/spinner-loader/spinner-loader.component */ "DFKd");






class LoaderService {
    constructor(overlay) {
        this.overlay = overlay;
    }
    open() {
        if (this.overlayRef) {
            return this.overlayRef;
        }
        const positionStrategy = this.overlay
            .position()
            .global()
            .centerHorizontally()
            .centerVertically();
        const overlayConfig = new _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__["OverlayConfig"]({
            hasBackdrop: true,
            positionStrategy,
        });
        const overlayRef = this.overlay.create(overlayConfig);
        const portal = new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__["ComponentPortal"](_components_spinner_loader_spinner_loader_component__WEBPACK_IMPORTED_MODULE_3__["SpinnerLoaderComponent"]);
        overlayRef.attach(portal);
        this.overlayRef = overlayRef;
        return this.overlayRef;
    }
    close() {
        setTimeout(() => {
            if (this.overlayRef !== null) {
                this.overlayRef.dispose();
            }
            this.overlayRef = null;
        }, 1000);
    }
}
LoaderService.ɵfac = function LoaderService_Factory(t) { return new (t || LoaderService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__["Overlay"])); };
LoaderService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: LoaderService, factory: LoaderService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoaderService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__["Overlay"] }]; }, null); })();


/***/ }),

/***/ "fbaV":
/*!****************************************************************!*\
  !*** ./src/app/core/interceptors/error-handler.interceptor.ts ***!
  \****************************************************************/
/*! exports provided: ErrorHandlerInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorHandlerInterceptor", function() { return ErrorHandlerInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _approot_shared_services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @approot/shared/services */ "ZF+8");
/* harmony import */ var _approot_notification_notification_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @approot/notification/notification.service */ "blnF");







class ErrorHandlerInterceptor {
    constructor(router, authenticationService, notificationService) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.notificationService = notificationService;
    }
    intercept(request, next) {
        return next.handle(request).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])((err) => this.errorHandler(err)));
    }
    errorHandler(response) {
        if (response.status === 401) {
            if (this.router.url !== '/auth/login') {
                this.notificationService.showError('You are not authenticated', response.error.message);
                this.authenticationService.logout();
                this.router.navigateByUrl('/auth/login').then();
                return;
            }
        }
        if (response.status === 403) {
            this.notificationService.showError('You dont have permission', response.error.message);
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])(response.error);
    }
}
ErrorHandlerInterceptor.ɵfac = function ErrorHandlerInterceptor_Factory(t) { return new (t || ErrorHandlerInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_approot_shared_services__WEBPACK_IMPORTED_MODULE_4__["AuthenticationService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_approot_notification_notification_service__WEBPACK_IMPORTED_MODULE_5__["NotificationService"])); };
ErrorHandlerInterceptor.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ErrorHandlerInterceptor, factory: ErrorHandlerInterceptor.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ErrorHandlerInterceptor, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }, { type: _approot_shared_services__WEBPACK_IMPORTED_MODULE_4__["AuthenticationService"] }, { type: _approot_notification_notification_service__WEBPACK_IMPORTED_MODULE_5__["NotificationService"] }]; }, null); })();


/***/ }),

/***/ "hU7O":
/*!***************************************************************!*\
  !*** ./src/app/shared/services/authentication-api.service.ts ***!
  \***************************************************************/
/*! exports provided: AuthenticationApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationApiService", function() { return AuthenticationApiService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base.service */ "FXLl");



const router = {
    login: `/auth/login`,
    checkAdmin: `/auth/checkAdmin`,
};
class AuthenticationApiService {
    constructor(baseService) {
        this.baseService = baseService;
    }
    login(user) {
        return this.baseService.post(router.login, user);
    }
    checkAdmin() {
        return this.baseService.get(router.checkAdmin);
    }
}
AuthenticationApiService.ɵfac = function AuthenticationApiService_Factory(t) { return new (t || AuthenticationApiService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_base_service__WEBPACK_IMPORTED_MODULE_1__["BaseService"])); };
AuthenticationApiService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AuthenticationApiService, factory: AuthenticationApiService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AuthenticationApiService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _base_service__WEBPACK_IMPORTED_MODULE_1__["BaseService"] }]; }, null); })();


/***/ }),

/***/ "kmKP":
/*!*************************************************!*\
  !*** ./src/app/shared/services/user.service.ts ***!
  \*************************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _approot_core_utils_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @approot/core/utils/helper */ "MZth");
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base.service */ "FXLl");




const router = {
    getAll: `/user/getAll`,
    getOne: `/user/getOne/{userId}`,
    update: `/user/update/{userId}`,
    delete: `/user/delete/{userId}`,
    create: `/user/create`,
};
class UserService {
    constructor(baseService) {
        this.baseService = baseService;
    }
    loadUsers() {
        return this.baseService.get(router.getAll);
    }
    loadUserById(userId) {
        const uri = Object(_approot_core_utils_helper__WEBPACK_IMPORTED_MODULE_1__["fmt"])(router.getOne, { userId });
        return this.baseService.get(uri);
    }
    createUser(user) {
        return this.baseService.post(router.create, user);
    }
    updateUser(userId, user) {
        const uri = Object(_approot_core_utils_helper__WEBPACK_IMPORTED_MODULE_1__["fmt"])(router.update, { userId });
        return this.baseService.put(uri, user);
    }
    deleteUser(userId) {
        const uri = Object(_approot_core_utils_helper__WEBPACK_IMPORTED_MODULE_1__["fmt"])(router.delete, { userId });
        return this.baseService.delete(uri);
    }
}
UserService.ɵfac = function UserService_Factory(t) { return new (t || UserService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"])); };
UserService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: UserService, factory: UserService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UserService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"] }]; }, null); })();


/***/ }),

/***/ "lPwT":
/*!*********************************************************!*\
  !*** ./src/app/core/guards/not-authentication.guard.ts ***!
  \*********************************************************/
/*! exports provided: NotAuthenticationGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotAuthenticationGuard", function() { return NotAuthenticationGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _shared_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services */ "ZF+8");





class NotAuthenticationGuard {
    constructor(router, authenticationService) {
        this.router = router;
        this.authenticationService = authenticationService;
    }
    canActivate(next, state) {
        if (!this.authenticationService.isAuthenticated) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(true);
        }
        this.router.navigate(['/']).then();
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(true);
    }
}
NotAuthenticationGuard.ɵfac = function NotAuthenticationGuard_Factory(t) { return new (t || NotAuthenticationGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_shared_services__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"])); };
NotAuthenticationGuard.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: NotAuthenticationGuard, factory: NotAuthenticationGuard.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NotAuthenticationGuard, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }, { type: _shared_services__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"] }]; }, null); })();


/***/ }),

/***/ "pKmL":
/*!*************************************!*\
  !*** ./src/app/core/core.module.ts ***!
  \*************************************/
/*! exports provided: CoreModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreModule", function() { return CoreModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _providers_enviroment_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./providers/enviroment.provider */ "Sc3e");
/* harmony import */ var _interceptors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./interceptors */ "6H+C");
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/overlay */ "rDax");







const interceptors = [
    {
        provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HTTP_INTERCEPTORS"],
        useClass: _interceptors__WEBPACK_IMPORTED_MODULE_4__["ApiPrefixInterceptor"],
        multi: true,
    },
    {
        provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HTTP_INTERCEPTORS"],
        useClass: _interceptors__WEBPACK_IMPORTED_MODULE_4__["LoaderInterceptor"],
        multi: true,
    },
    {
        provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HTTP_INTERCEPTORS"],
        useClass: _interceptors__WEBPACK_IMPORTED_MODULE_4__["TokenInterceptor"],
        multi: true,
    },
    {
        provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HTTP_INTERCEPTORS"],
        useClass: _interceptors__WEBPACK_IMPORTED_MODULE_4__["ErrorHandlerInterceptor"],
        multi: true,
    },
];
class CoreModule {
    constructor(parentModule) {
        if (parentModule) {
            throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
        }
    }
}
CoreModule.ɵfac = function CoreModule_Factory(t) { return new (t || CoreModule)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](CoreModule, 12)); };
CoreModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: CoreModule });
CoreModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ providers: [
        ...interceptors,
        _providers_enviroment_provider__WEBPACK_IMPORTED_MODULE_3__["EnvironmentServiceProvider"]
    ], imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_5__["OverlayModule"]
        ]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CoreModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_5__["OverlayModule"]
                ],
                providers: [
                    ...interceptors,
                    _providers_enviroment_provider__WEBPACK_IMPORTED_MODULE_3__["EnvironmentServiceProvider"]
                ],
                declarations: [],
            }]
    }], function () { return [{ type: CoreModule, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["SkipSelf"]
            }] }]; }, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](CoreModule, { imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_5__["OverlayModule"]] }); })();


/***/ }),

/***/ "sDBb":
/*!********************************************************!*\
  !*** ./src/app/shared/services/credentials.service.ts ***!
  \********************************************************/
/*! exports provided: CURRENT_USER, CredentialsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CURRENT_USER", function() { return CURRENT_USER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CredentialsService", function() { return CredentialsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


const CURRENT_USER = 'CURRENT_USER';
class CredentialsService {
    constructor() {
        this.credentials = null;
        const savedCredentials = sessionStorage.getItem(CURRENT_USER) ||
            localStorage.getItem(CURRENT_USER);
        if (savedCredentials) {
            this.credentials = JSON.parse(savedCredentials);
        }
    }
    get isAuthenticated() {
        return !!this.credentials;
    }
    get getCredentials() {
        const savedCredentials = sessionStorage.getItem(CURRENT_USER) ||
            localStorage.getItem(CURRENT_USER);
        if (savedCredentials) {
            this.credentials = JSON.parse(savedCredentials);
        }
        return this.credentials;
    }
    get email() {
        const credential = this.getCredentials;
        if (credential) {
            return credential.email;
        }
        return null;
    }
    setCredentials(credentials, remember) {
        this.credentials = credentials || null;
        if (credentials) {
            const storage = remember ? localStorage : sessionStorage;
            storage.setItem(CURRENT_USER, JSON.stringify(credentials));
        }
        else {
            sessionStorage.removeItem(CURRENT_USER);
            localStorage.removeItem(CURRENT_USER);
            localStorage.clear();
        }
    }
}
CredentialsService.ɵfac = function CredentialsService_Factory(t) { return new (t || CredentialsService)(); };
CredentialsService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: CredentialsService, factory: CredentialsService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CredentialsService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "seby":
/*!***************************************************************************!*\
  !*** ./src/app/shared/components/spinner-loader/spinner-loader.module.ts ***!
  \***************************************************************************/
/*! exports provided: SpinnerLoaderModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpinnerLoaderModule", function() { return SpinnerLoaderModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _spinner_loader_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./spinner-loader.component */ "DFKd");
/* harmony import */ var ng_zorro_antd_spin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng-zorro-antd/spin */ "qAZ0");





class SpinnerLoaderModule {
}
SpinnerLoaderModule.ɵfac = function SpinnerLoaderModule_Factory(t) { return new (t || SpinnerLoaderModule)(); };
SpinnerLoaderModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: SpinnerLoaderModule });
SpinnerLoaderModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            ng_zorro_antd_spin__WEBPACK_IMPORTED_MODULE_3__["NzSpinModule"]
        ]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SpinnerLoaderModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [_spinner_loader_component__WEBPACK_IMPORTED_MODULE_2__["SpinnerLoaderComponent"]],
                exports: [
                    _spinner_loader_component__WEBPACK_IMPORTED_MODULE_2__["SpinnerLoaderComponent"]
                ],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    ng_zorro_antd_spin__WEBPACK_IMPORTED_MODULE_3__["NzSpinModule"]
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](SpinnerLoaderModule, { declarations: [_spinner_loader_component__WEBPACK_IMPORTED_MODULE_2__["SpinnerLoaderComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        ng_zorro_antd_spin__WEBPACK_IMPORTED_MODULE_3__["NzSpinModule"]], exports: [_spinner_loader_component__WEBPACK_IMPORTED_MODULE_2__["SpinnerLoaderComponent"]] }); })();


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _approot_core_guards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @approot/core/guards */ "yK//");





const routes = [
    {
        path: '',
        loadChildren: () => __webpack_require__.e(/*! import() | approot-layout-layout-module */ "approot-layout-layout-module").then(__webpack_require__.bind(null, /*! @approot/layout/layout.module */ "Tx//")).then(m => m.LayoutModule),
        canActivate: [
            _approot_core_guards__WEBPACK_IMPORTED_MODULE_2__["NotAuthenticationGuard"]
        ]
    },
    /*{
      path: 'auth',
      loadChildren: () => import('@approot/authentication/authentication.module').then(m => m.AuthenticationModule),
      canActivate: [
        NotAuthenticationGuard
      ]
    },*/
    {
        path: '**',
        redirectTo: '/welcome',
        pathMatch: 'full'
    }
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes, { relativeLinkResolution: 'legacy' })], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes, { relativeLinkResolution: 'legacy' })],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();


/***/ }),

/***/ "wndk":
/*!*************************************************************!*\
  !*** ./src/app/core/interceptors/api-prefix.interceptor.ts ***!
  \*************************************************************/
/*! exports provided: ApiPrefixInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiPrefixInterceptor", function() { return ApiPrefixInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _approot_shared_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @approot/shared/services */ "ZF+8");



class ApiPrefixInterceptor {
    constructor(envService) {
        this.envService = envService;
    }
    intercept(request, next) {
        request = request.clone({
            url: this.envService.baseUrl + request.url,
        });
        return next.handle(request);
    }
}
ApiPrefixInterceptor.ɵfac = function ApiPrefixInterceptor_Factory(t) { return new (t || ApiPrefixInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_approot_shared_services__WEBPACK_IMPORTED_MODULE_1__["EnvironmentService"])); };
ApiPrefixInterceptor.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ApiPrefixInterceptor, factory: ApiPrefixInterceptor.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ApiPrefixInterceptor, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }], function () { return [{ type: _approot_shared_services__WEBPACK_IMPORTED_MODULE_1__["EnvironmentService"] }]; }, null); })();


/***/ }),

/***/ "yK//":
/*!**************************************!*\
  !*** ./src/app/core/guards/index.ts ***!
  \**************************************/
/*! exports provided: AuthenticationGuard, NotAuthenticationGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _authentication_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./authentication.guard */ "MGpm");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthenticationGuard", function() { return _authentication_guard__WEBPACK_IMPORTED_MODULE_0__["AuthenticationGuard"]; });

/* harmony import */ var _not_authentication_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./not-authentication.guard */ "lPwT");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NotAuthenticationGuard", function() { return _not_authentication_guard__WEBPACK_IMPORTED_MODULE_1__["NotAuthenticationGuard"]; });





/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map