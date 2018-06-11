package org.tondu.bioevo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.tondu.bioevo.api.response.DoStepResponse;
import org.tondu.bioevo.model.StepCriteria;

/**
 * Controller handling requests to compute next time steps. 
 * 
 * @author Marko Urm
 */
@RestController
@RequestMapping(value="/v1/{worldId}/step")
public class TimeStepController {

    @GetMapping( "/{steps}" )
    public DoStepResponse doSteps(@PathVariable("worldId") long worldId, 
                                  @PathVariable("steps") int steps) {
        StepCriteria criteria = new StepCriteria();
        criteria.setStepCount( steps );
        return calculate( criteria );
    }
    
    @PostMapping()
    public DoStepResponse doSteps(@PathVariable("worldId") long worldId,
                                  @RequestBody StepCriteria criteria) {
        return calculate( criteria );
    }
    
    private DoStepResponse calculate(StepCriteria criteria) {
        DoStepResponse response = new DoStepResponse();
        String message = String.format( "Started calculating next %d step(s)", criteria.getStepCount() );
        response.setMessage( message );
        return response;
    }
    
}
