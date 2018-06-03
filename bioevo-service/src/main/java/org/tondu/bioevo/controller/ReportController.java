package org.tondu.bioevo.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.tondu.bioevo.model.World;

/**
 * Serves reports about BioEvo worlds.
 *
 * @author Marko Urm
 */
@RestController
@RequestMapping(value="/v1/report")
public class ReportController {

    @RequestMapping(value="/{worldId}/{step}",method = RequestMethod.GET)
    public World worldState(@PathVariable("worldId") long worldId, @PathVariable("step") int step) {

        World world = new World( worldId );
        world.setCurrentStep( step );
        return world;
    }
    
}
