/*jslint node: true */
/*jshint esversion: 6 */
"use strict";
/**
 * customers service router.
 */
const path = require("path");
const log = require(path.join(__dirname, "../../log"));
const helper = require("../helpers/helper");

const customerService = require("../service/customerService");
const validator = require("../helpers/customerValidation.js");
const common = require("./commonLogic");

module.exports = {
    //GET /lending/searchBusinessDetails
    searchBusinessDetails: function searchBusinessDetails(req, res, next) {
        let op = "searchBusinessDetails";
        log.info(op + " router called: ");

        let {valid, message} = validator.validateSearchBP(req);

        if (!valid) {
            return next(helper.createBadRequestError(message));
        }
        customerService.searchBusinessDetails(req, res)
            .then(result => common.handleResponse(op, res, result, null))
            .catch(err => common.handleResponse(op, res, null, err));
    },

    //GET /lending/businessDetails/{id}
    fetchReadBPBusinessDetails: function fetchReadBPBusinessDetails(req, res, next) {
        let op = "businessDetails";
        log.info(op + " router called");

        let {valid, message} = validator.validateBpid(req);

        if (!valid) {
            return next(helper.createBadRequestError(message));
        }
        customerService.getBusinessDetails(req, res)
            .then(result => common.handleResponse(op, res, result, null))
            .catch(err => common.handleResponse(op, res, null, err));
    },

    //GET /lending/fetchReadBPBusinessInformation/{id}
    fetchReadBPBusinessInformation: function fetchReadBPBusinessInformation(req, res) {
        let op = "businessInformation";
        log.info(op + " router called");

        customerService.getBusinessInformation(req, res)
            .then(result => common.handleResponse(op, res, result, null))
            .catch(err => common.handleResponse(op, res, null, err));
    },

    //GET /lending/ownershipStructure/{bpid}/legalForm/{legalForm}
    fetchReadBPOwnershipStructure: function fetchReadBPOwnershipStructure(req, res) {
        let op = "ownershipStructure";
        log.info(op + " router called");

        customerService.getOwnership(req, res)
            .then(result => common.handleResponse(op, res, result, null))
            .catch(err => common.handleResponse(op, res, null, err));
    },

    // GET /lending/assetsAndLiabilities
    fetchAssetAndLiabilities: function fetchAssetAndLiabilities(req, res, next) {
        let op = "fetchAssetAndLiabilities";
        log.info(op + " router called: ");
        customerService.getAssetsAndLiabilities(req, res)
            .then(result => {
                var assetList = [];
                var liabilityList = [];
                if (result && result[0]) {
                    if (result[0].Assets) {
                        assetList = assetList.concat(result[0].Assets);
                    }
                    if (result[0].Liabilities) {
                        liabilityList = liabilityList.concat(result[0].Liabilities);
                    }
                }
                if (result && result[1]) {
                    if (result[1].Assets) {
                        assetList = assetList.concat(result[1].Assets);
                    }
                    if (result[1].Liabilities) {
                        liabilityList = liabilityList.concat(result[1].Liabilities);
                    }
                }

                common.handleResponse(op, res, {
                    Assets: assetList,
                    Liabilities: liabilityList
                }, null);
            })
            .catch(err => common.handleResponse(op, res, null, err));
    },

    //GET /lending/netWorthTotals
    fetchGetNetWorthTotals: function fetchGetNetWorthTotals(req, res, next) {
        let op = "fetchGetNetWorthTotals";
        log.info(op + " router called: ");

        customerService.getNetWorthTotals(req, res)
            .then(result => common.handleResponse(op, res, result, null))
            .catch(err => common.handleResponse(op, res, null, err));
    },

    //GET /lending/health
    health: function health(req, res) {
        let op = "health";
        log.info(op + " router called");
        customerService.health(req, res)
            .then(result => common.handleResponse(op, res, result, null))
            .catch(err => common.handleResponse(op, res, null, err));
    }
};