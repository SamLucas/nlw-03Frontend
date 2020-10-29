import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Landing from "./pages/Landing"
import OrphanafesMap from "./pages/OrphanafesMap"
import CreateOrphanage from "./pages/CreateOrphanage"
import Orphanage from "./pages/Orphanage"


export default function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Landing} />
				<Route path="/app" component={OrphanafesMap} />
				<Route path="/details/:id" component={Orphanage} />
				<Route path="/create" component={CreateOrphanage} />
			</Switch>
		</BrowserRouter>
	)
}