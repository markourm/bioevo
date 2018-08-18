package org.tondu.bioevo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.tondu.bioevo.api.request.DoStepsRequest;
import org.tondu.bioevo.api.response.DoStepsResponse;

/**
 * Controller handling requests to compute next time steps. 
 * 
 * @author Marko Urm
 */
@RestController
@RequestMapping(value = "/v1/world/{worldId}/step")
public class TimeStepController {
    
    private static final Logger LOG = LoggerFactory.getLogger( TimeStepController.class );

    @PostMapping( "/{steps}" )
    public DoStepsResponse doSteps(@PathVariable("worldId") long worldId, 
                                  @PathVariable("steps") int steps) {
        
        LOG.info( "Do steps for world {}", worldId );
        
        DoStepsRequest request = new DoStepsRequest();
        request.setStepCount( steps );
        return calculate( worldId, request );
    }
    
    @PostMapping
    public DoStepsResponse doSteps(@PathVariable("worldId") long worldId,
                                  @RequestBody DoStepsRequest request) {
        LOG.info( "Do steps for world {}", worldId );
        return calculate( worldId, request );
    }
    
    private DoStepsResponse calculate(long worldId, DoStepsRequest request) {
        
        LOG.info( "Received request {}", request );
        
        DoStepsResponse response = new DoStepsResponse();
        String message = String.format( "Started calculating next %d step(s)", request.getStepCount() );
        response.setWorldId( worldId );
        response.setMessage( message );
        return response;
    }
    
}
