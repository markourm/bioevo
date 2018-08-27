package org.tondu.bioevo.controller;

import java.util.ArrayList;
import java.util.List;

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
@RequestMapping(value = "/v1/report/world")
public class ReportController {
    
    private static final Logger LOG = LoggerFactory.getLogger( ReportController.class );

    @GetMapping
    public List<World> getWorlds() {

        LOG.info( "Get list of all worlds" );        
        return listAllWorlds();
    }

    @GetMapping( "/{worldId}" )
    public World getWorldState(@PathVariable("worldId") long worldId) {

        LOG.info( "Get state of world {}", worldId );
        
        var world = new World( worldId );
        world.setCurrentStepId( 1 );
        return world;
    }
    
    @GetMapping( "/{worldId}/{stepId}" )
    public World getWorldState(@PathVariable("worldId") long worldId, @PathVariable("stepId") int stepId) {

        LOG.info( "Get state of world {} at step {}", worldId, stepId );
        
        var world = new World( worldId );
        world.setCurrentStepId( stepId );
        return world;
    }
    
    private List<World> listAllWorlds() {
        
        var world1 = new World( 1L );
        world1.setCurrentStepId( 1 );
        
        var world2 = new World( 5L );
        world2.setCurrentStepId( 30 );
        
        var worlds = new ArrayList<World>();
        worlds.add( world1 );
        worlds.add( world2 );
        
        return worlds;
    }
    
}
