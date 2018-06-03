package org.tondu.bioevo.model;

/**
 * Encapsulates criteria defining when step calculation should be stopped.
 *
 * @author Marko Urm
 */
public class StepCriteria {

    private int stepCount = 1;
    
    public int getStepCount() {
        return stepCount;
    }
    
    public void setStepCount(int stepCount) {
        this.stepCount = stepCount;
    }
    
}
