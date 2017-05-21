/* eslint-env mocha */
import { expect } from 'chai'

import Apdex from '../src/models/apdex'
import stubData, {
    app1,
    app2,
    app3,
    app4,
} from './stub_data.js'

describe('Apdex', () => {
    it('getTopAppsByHost', () => {
        const apdex = new Apdex(stubData)

        const topAppsForHost1 = apdex.getTopAppsByHost('host1')
        const topAppsForHost2 = apdex.getTopAppsByHost('host2')


        expect(topAppsForHost1).to.deep.equal([ app1, app4, app2 ])
        expect(topAppsForHost2).to.deep.equal([ app4, app2, app3 ])
    })

    it('removeAppFromHosts', () => {
        const apdex = new Apdex(stubData)

        apdex.removeAppFromHosts('app4')

        const topAppsForHost1 = apdex.getTopAppsByHost('host1')
        const topAppsForHost2 = apdex.getTopAppsByHost('host2')

        expect(topAppsForHost1).to.deep.equal([ app1, app2 ])
        expect(topAppsForHost2).to.deep.equal([ app2, app3 ])
    })

    it('addAppToHosts', () => {
        const apdex = new Apdex(stubData)
        const app5 = {
            name: 'app5',
            apdex: 9,
            host: [],
            contributors: ['person'],
            version: 1,
        }

        apdex.addAppToHosts(app5)

        const topAppsForHost1 = apdex.getTopAppsByHost('host1')
        const topAppsForHost2 = apdex.getTopAppsByHost('host2')


        expect(topAppsForHost1).to.deep.equal([ app1, app5, app4, app2 ])
        expect(topAppsForHost2).to.deep.equal([ app5, app4, app2, app3 ])
    })
})