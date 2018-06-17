package org.tondu.bioevo.api.request;

/**
 * Request to advance world at least by one step.
 * Encapsulates criteria defining when step calculation should be stopped.
 *
 * @author Marko Urm
 */
public class DoStepsRequest {

    private int stepCount = 1;
    
    public int getStepCount() {
        return stepCount;
    }
    
    public void setStepCount(int stepCount) {
        this.stepCount = stepCount;
    }

    @Override
    public String toString() {
        return "DoStepsRequest [stepCount=" + stepCount + "]";
    }
    
}
