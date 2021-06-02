import fs from 'fs';
import path from 'path';
import IData from '../../interface/IData';

/* Routes for metaData */
import { routes, staticPages } from '../../../routes/index';

export default class MetaReader implements IData {

    private combinedRoutes: any[];
    constructor(private slug: string, private parent: string = '') {
        this.combinedRoutes = routes.concat(staticPages);
    }

    public getContent(): object {
        if (!this.parent) {
            return this.combinedRoutes.find( route => this.slugFromUrl(route.url) === this.slug );
        }
        const subRoutes = this.filterSubRoutes();
        return subRoutes.find( route => this.slugFromUrl(route.url) === this.slug );
    }

    private slugFromUrl(url: string): string {
        return url.replaceAll('/', '');
    }

    private filterSubRoutes(): any[] {
        if (!this.parent.length) {
            return [];
        }
        return this.combinedRoutes.find(route => route.url.replace('/', '') === this.parent).sub;
    }
}