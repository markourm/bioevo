package org.tondu.bioevo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
@RequestMapping(value = "/v1/report")
public class ReportController {
    
    private static final Logger LOGGER = LoggerFactory.getLogger( ReportController.class );

    @GetMapping( "/{worldId}/{stepId}" )
    public World worldState(@PathVariable("worldId") long worldId, @PathVariable("stepId") int stepId) {

        LOGGER.info( "Get state of world {} at step {}", worldId, stepId );
        
        World world = new World( worldId );
        world.setCurrentStepId( stepId );
        return world;
    }
    
}
