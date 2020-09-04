
import React from 'react';
import axios, { AxiosInstance } from 'axios';
import { AuthenticationService } from '../../authentication/authentication.service';

export class HttpInterceptorFactory {
    private _authenticationService : AuthenticationService;

    constructor() {
        this._authenticationService = new AuthenticationService();
    }

    create(type: ClientType) : AxiosInstance {
        switch(type){
            case ClientType.CrmApi:
                return this.crmApi();
            default:
                throw "Unknown client type provided.";
        }
    }

    private crmApi() : AxiosInstance{
        const token = this._authenticationService.getToken();
        const instance = axios.create({
            baseURL: '/api/',
            timeout: 1000,
            headers: {'Authorization': `Bearer ${token}`}
        });

        return instance;
    }
}

export enum ClientType {
    CrmApi
}
