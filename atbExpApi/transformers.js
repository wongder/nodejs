/*jslint node: true */
/*jshint esversion: 6 */
"use strict";

const path = require("path");
const util = require("util");
const _ = require("lodash");
const log = require(path.join(__dirname, "../../log"));
const validator = require("../helpers/customerValidation.js");
const helper = require("../helpers/helper");
const moment = require("moment");


function translateDateFormat(entResponse) {
    let output = moment(entResponse).format("MMM DD, YYYY");
    log.info("output=" + output);
    //let output = dateFormate(entResponse, "mmm dd, yyyy");
    if (output === "Invalid date") {
        output = "";
    }
    log.info("translated dateformat values: " + JSON.stringify(output));
    return output;
}

const TERM_LOAN = "LN_CONS_R";
function outTermLoansWithZeroBalance(item) {
    return (_.get(item, "productExt") !== TERM_LOAN ||
           (_.get(item, "productExt") === TERM_LOAN && _.get(item, "balance") > 0));
}

module.exports = {
    /*
    transform~ : requests from ui to back
    translate~ : response from back to ui
    */
    translateSearchBPResponse: function translateSearchBPResponse(entResponse) {
        log.info("translateSearchBPResponse start: " + util.inspect(entResponse));
        let temp = entResponse.SearchBusinessPartners.map((item, i) => (
            {
                partnerId: _.get(item, "PartnerId"),
                name: _.get(item, "Name"),
                busType: _.get(item, "Type"),
                legalFormCode: _.get(item, "LegalFormCode"),
                legalFormDescr: _.get(item, "LegalFormDescr"),
                city: _.get(item, "City"),
                region: _.get(item, "Region")
            }
        ));
        return {results: temp};
    },
    translateGetBusinessDetailsResponse: function translateGetBusinessDetailsResponse(entResponse) {
        log.info("translateGetBusinessDetailsResponse start: " + util.inspect(entResponse));
        let resp = entResponse.BusinessPartners;

        let {valid, message} = validator.validateBpid(resp.Bpid);

        if (!valid) {
            return helper.createBadRequestError(message);
            //return next(helper.createBadRequestError(message));
        }
        let uiResponse = {
            bpid: resp.Bpid,
            name: resp.Name,
            loanType: "",
            legalFormCode: resp.LegalFormCode,
            legalFormDesc: resp.LegalFormDescr
        };

        return uiResponse;
    },
    translateGetBusinessInformationResponse: function translateGetBusinessInformationResponse(entResponse) {
        log.info("translateGetBusinessInformationResponse start: " + util.inspect(entResponse));
        let resp = entResponse.AdditionalDetails;
        let {valid, message} = validator.validateBpid(resp.Bpid);

        if (!valid) {
            return helper.createBadRequestError(message);
        }

        let uiResponse = {
            partnerId: resp.Bpid,
            offerId: resp.OfferId,
            companyYearEnd: translateDateFormat(resp.CompFiscYrEnd),
            companyStartDate: translateDateFormat(resp.YrsInBusiness),
            businessInAlberta: resp.BusInAlberta,
            businessStructure: resp.BusStructure,
            busStructureDesc: resp.BusStructureDesc,
            businessClassificationDesc: resp.BusClassificationDesc,
            businessDescription: resp.BusDescription,
            naicsCode: JSON.stringify(resp.NaicsCode),
            naicsDescription: resp.NaicsDesc,
            opportunityID: resp.OpptId,
            opportunityGUID: resp.OpptGuid
        };

        return uiResponse;
    },
    translateGetOwnershipResponse: function translateGetOwnershipResponse(entResponse) {
        const resp = entResponse.OwnershipStructure;

        const uiResponse = [];
        resp.forEach((ownership) => {
            const uiOwnership = {
                Partner1: ownership.Partner1,
                Partner1Name: ownership.Partner1Name,
                Partner1Type: ownership.Partner1Type,
                Partner2: ownership.Partner2,
                RelationshipCategory: ownership.RelationshipCategory,
                ValidFromDate: translateDateFormat(ownership.ValidFromDate),
                ValidUntilDate: translateDateFormat(ownership.ValidUntilDate),
                PercentOfParticipation: ownership.PercentOfParticipation,
                DateOfBirth: translateDateFormat(ownership.DateOfBirth),
                Bankruptcy: ownership.Bankruptcy
            };
            //if there is no residential status set then we default them to owner
            if (ownership.ResidentialStatusCode && ownership.ResidentialStatusDescr) {
                uiOwnership.ResidentialStatusCode = ownership.ResidentialStatusCode;
                uiOwnership.ResidentialStatusDescr = ownership.ResidentialStatusDescr;
            } else {
                uiOwnership.ResidentialStatusCode = "01";
                uiOwnership.ResidentialStatusDescr = "Owner";
            }
            uiResponse.push(uiOwnership);
        });

        return uiResponse;
    },
    translateGetNetWorthTotalsResponse: function translateGetNetWorthTotalsResponse(entResponse) {
        log.info("translateNetWorthTotalsResponse start: " + util.inspect(entResponse));
        let temp = entResponse.results.map((item, i) => (
            {
                partnerId: _.get(item, "partnerId"),
                totalAssets: _.get(item, "assetAmount"),
                totalLiabilities: _.get(item, "liabilityAmount"),
                totalNetWorth: _.get(item, "assetAmount") - _.get(item, "liabilityAmount")
            }
        ));
        return {results: temp};
    },
    translateGetAssetLiabilitiesResponse: function translateGetAssetLiabilitiesResponse(entResponse) {
        log.info("translateGetBpAssetsResponse start: " + util.inspect(entResponse));

        let assets = [];
        let liabilities = [];
        if (entResponse && entResponse.results && entResponse.results.assets) {
            assets = entResponse.results.assets
                .map((item) => ({
                    bpid: _.get(item, "partner"),
                    source: _.get(item, "source"),
                    accountNo: _.get(item, "acNumExt"),
                    typeCode: _.get(item, "acctType"),
                    description: _.get(item, "bankKey") + "/" + _.get(item, "acNumExt"),
                    acntDescription: "",
                    isIncluded: true,
                    balanceAmt: _.get(item, "balanceAmt"),
                    availableAmt: _.get(item, "availableAmt"),
                    currency: _.get(item, "currency"),
                    productInt: _.get(item, "productInt"),
                    productExt: _.get(item, "productExt"),
                    productDesc: _.get(item, "productDesc"),
                    bankKey: _.get(item, "bankKey"),
                    partnerName: _.get(item, "partnerName")
                }));
        }
        if (entResponse && entResponse.results && entResponse.results.liabilities) {
            liabilities = entResponse.results.liabilities
                .filter(outTermLoansWithZeroBalance)
                .map((item) => ({
                    bpid: _.get(item, "partner"),
                    source: _.get(item, "source"),
                    accountNo: _.get(item, "acNumExt"),
                    typeCode: _.get(item, "acctType"),
                    description: _.get(item, "bankKey") + "/" + _.get(item, "acNumExt"),
                    isIncluded: true,
                    balanceAmt: _.get(item, "balanceAmt"),
                    availableAmt: _.get(item, "availableAmt"),
                    currency: _.get(item, "currency"),
                    productInt: _.get(item, "productInt"),
                    productExt: _.get(item, "productExt"),
                    productDesc: _.get(item, "productDesc"),
                    bankKey: _.get(item, "bankKey"),
                    partnerName: _.get(item, "partnerName")
                }));
        }

        return {Assets: assets, Liabilities: liabilities};
    },
    translateGetAssetLiabilitiesCRMResponse: function translateGetAssetLiabilitiesCRMResponse(entResponse) {
        log.info("translateGetBpAssetsCRMResponse start: " + util.inspect(entResponse));
        let assets = [];
        let liabilities = [];
        if (entResponse && entResponse.results && entResponse.results.assets) {
            assets = entResponse.results.assets
                .map((item) => ({
                    bpid: _.get(item, "partner"),
                    source: _.get(item, "source"),
                    accountNo: "",
                    typeCode: _.get(item, "type"),
                    description: _.get(item, "typeDescr"),
                    acntDescription: _.get(item, "acntDescr"),
                    isIncluded: true,
                    balanceAmt: _.get(item, "assetValue"),
                    availableAmt: "",
                    currency: "",
                    productInt: "",
                    productExt: "",
                    productDesc: "",
                    bankKey: "",
                    partnerName: _.get(item, "partnerName")
                }));
        }

        if (entResponse && entResponse.results && entResponse.results.liabilities) {
            liabilities = entResponse.results.liabilities
                .map((item) => ({
                    bpid: _.get(item, "partner"),
                    source: _.get(item, "source"),
                    accountNo: "",
                    typeCode: _.get(item, "type"),
                    description: _.get(item, "typeDescr"),
                    acntDescription: _.get(item, "acntDescr"),
                    isIncluded: true,
                    balanceAmt: _.get(item, "balance"),
                    availableAmt: "",
                    currency: "",
                    productInt: "",
                    productExt: "",
                    productDesc: "",
                    bankKey: "",
                    partnerName: _.get(item, "partnerName")
                }));
        }

        return {Assets: assets, Liabilities: liabilities};
    }
};