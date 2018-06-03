/**
 * 
 */
package org.tondu.bioevo.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller handling requests to compute next time steps. 
 * 
 * @author Marko Urm
 */
@RestController
@RequestMapping(value="start")
public class TimeStepController {

    @RequestMapping(value="/{first}/{second}",method = RequestMethod.GET)
    public String hello( @PathVariable("first") String first,
                         @PathVariable("second") String second) {

        return String.format("{\"message\":\"Started %s %s\"}", first, second);
    }
    
}
