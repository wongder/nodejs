/*jslint node: true */
/*jshint esversion: 6 */
"use strict";

const path = require("path");

const util = require("util");
const log = require(path.join(__dirname, "../../log"));
const config = require(path.join(__dirname, "../../config"));
const restify = require("restify");
const helper = require("../helpers/helper");
const transformers = require("../helpers/transformers");
const common = require("./commonSvcLogic");
const env = config.app.env;
const prefixEntApi = "/LendingReimaginedENTAPI";
const qs = require("querystring");
const errors = require("restify-errors");

const client = restify.createJsonClient({
    url: config.app.entAddress,
    version: "*"
});

module.exports = {
    client, // for stubbing
    searchBusinessDetails: function searchBusinessDetails(req) {
        const op = "searchBusinessDetails";
        let partnerId = req.swagger.params.partnerId.value;
        let name = req.swagger.params.name.value;
        let maxHits = req.swagger.params.maxHits.value;
        let bpType = req.swagger.params.bpType.value;
        let uri = "/api/crm/searchBP?";
        if (!util.isNullOrUndefined(partnerId)) {
            uri = uri + "partnerId=" + partnerId;
        }
        if (!util.isNullOrUndefined(name)) {
            if (util.isNullOrUndefined(partnerId)) {
                uri = uri + "name=" + qs.escape(name);
            } else {
                uri = uri + "&name=" + qs.escape(name);
            }
        }
        if (!util.isNullOrUndefined(maxHits)) {
            uri = uri + "&maxHits=" + maxHits;
        }
        if (!util.isNullOrUndefined(bpType)) {
            uri = uri + "&type=" + bpType;
        }
        if (env === "local") {
            uri = prefixEntApi + uri;
        }
        log.info("service : " + op + ":" + uri);
        helper.forwardSecurityHeaders(req, client.headers);
        return new Promise(function (resolve, reject) {
            client.get(uri, (err, req, res, obj) => {
                common.generalSvcCallback(op, reject, resolve, client, err, obj,
                    transformers.translateSearchBPResponse);
            });
        });
    },
    getBusinessDetails: function getBusinessDetails(req) {
        const op = "getBusinessDetails";
        let bpid = req.swagger.params.bpid.value;
        let uri = "/api/crm/businessDetails?bpid=" + bpid;

        if (env === "local") {
            uri = prefixEntApi + uri;
        }

        log.info("service : " + op + ":" + uri);
        helper.forwardSecurityHeaders(req, client.headers);
        return new Promise(function (resolve, reject) {
            client.get(uri, (err, req, res, obj) => {
                common.generalSvcCallback(op, reject, resolve, client, err, obj,
                    transformers.translateGetBusinessDetailsResponse);
            });
        });
    },
    getBusinessInformation: function getBusinessInformation(req, res) {
        const op = "getBusinessInformation";
        let bpid = req.swagger.params.bpid.value;
        let uri = "/api/crm/businessInformation?bpid=" + bpid;
        if (env === "local") {
            uri = prefixEntApi + uri;
        }
        log.info("service : " + op + ":" + uri);
        helper.forwardSecurityHeaders(req, client.headers);
        return new Promise(function (resolve, reject) {
            client.get(uri, (err, req, res, obj) => {
                common.generalSvcCallback(op, reject, resolve, client, err, obj,
                    transformers.translateGetBusinessInformationResponse);
            });
        });
    },
    getOwnership: function getOwnership(req, res) {
        return new Promise(function (resolve, reject) {
            const bpid = req.swagger.params.bpid.value;
            const legalForm = req.swagger.params.legalForm.value;
            // uri is having bpid and legalForm injected into it
            let uri = `/api/crm/ownershipStructure?bpid=${bpid}&legalForm=${legalForm}`;
            if (env === "local") {
                uri = prefixEntApi + uri;
            }
            log.info("getOwnership start: " + uri);
            helper.forwardSecurityHeaders(req, client.headers);
            client.get(uri, function (err, req, res, obj) {
                if (err) {
                    log.error("OwnershipStructure response with error: " + util.inspect(err));
                    reject(err);
                } else {
                    log.info("OwnershipStructure response: " + util.inspect(obj));
                    // post processing may be?
                    if (obj.OwnershipStructure === undefined || obj.OwnershipStructure.length === 0) {
                        if (obj.log && obj.log.MaximumLogItemSeverityCode !== 1) {
                            reject(new errors.HttpError({statusCode: 500, message: obj.log.Item[0].Note}));
                        }
                        if (res.statusCode !== 200) {
                            reject(new errors.HttpError({statusCode: res.statusCode}));
                        }
                        return;
                    }
                    resolve({"OwnershipStructure": transformers.translateGetOwnershipResponse(obj)});
                }
            });
        });
    },
    getNetWorthTotals: function getNetWorthTotals(req, res) {
        const op = "getNetWorthTotals";
        let bpid = req.swagger.params.bpid.value;
        let uri = "/api/bas/getNetWorthTotals?partnerIds=" + bpid;
        if (env === "local") {
            uri = prefixEntApi + uri;
        }
        log.info("service : " + op + ":" + uri);
        helper.forwardSecurityHeaders(req, client.headers);
        return new Promise(function (resolve, reject) {
            client.get(uri, (err, req, res, obj) => {
                common.generalSvcCallback(op, reject, resolve, client, err, obj,
                    transformers.translateGetNetWorthTotalsResponse);
            });
        });
    },
    /**
     * This may be overkill but, I am new to node and this was the first solution I came to.
     * @returns {Promise}
     */
    health: function health() {
        return new Promise(function (resolve) {
            resolve({success: "success"});
        });
    },
    getAssetsAndLiabilities: function getAssetsAndLiabilities(req, res) {
        const op = "getAssetsAndLiabilities";
        let bpid = req.swagger.params.bpid.value;

        let uri = "/api/bas/getAssetLiabilityDetail?partnerId=" + bpid;
        if (env === "local") {
            uri = prefixEntApi + uri;
        }
        log.info("service : " + op + ":" + uri);
        helper.forwardSecurityHeaders(req, client.headers);
        let promiseFromBaS = new Promise(function (resolve, reject) {
            client.get(uri, (err, req, res, obj) => {
                common.generalSvcCallback(op, reject, resolve, client, err, obj, transformers.translateGetAssetLiabilitiesResponse);
            });
        });

        uri = "/api/crm/assetLiabilityDetail?partnerIds=" + bpid.split(' ');
        if (env === "local") {
            uri = prefixEntApi + uri;
        }
        log.info("service : " + op + ":" + uri);
        helper.forwardSecurityHeaders(req, client.headers);
        let promiseFromCRM = new Promise(function (resolve, reject) {
            client.get(uri, (err, req, res, obj) => {
                common.generalSvcCallback(op, reject, resolve, client, err, obj, transformers.translateGetAssetLiabilitiesCRMResponse);
            });
        });

        return Promise.all([promiseFromBaS, promiseFromCRM]);
    }
};