package org.tondu.bioevo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
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

    @GetMapping( "/{worldId}/{stepId}" )
    public World worldState(@PathVariable("worldId") long worldId, @PathVariable("stepId") int stepId) {

        World world = new World( worldId );
        world.setCurrentStepId( stepId );
        return world;
    }
    
}
