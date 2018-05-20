package org.tondu.bioevo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

@SpringBootApplication
@RestController
@RequestMapping(value="start")
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @RequestMapping(value="/{first}/{second}",method = RequestMethod.GET)
    public String hello( @PathVariable("first") String first,
                         @PathVariable("second") String second) {

        return String.format("{\"message\":\"Started %s %s\"}", first, second);
    }
}
