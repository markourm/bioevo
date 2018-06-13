package org.tondu.bioevo.api.request;

/**
 * Request to create a new world.
 *
 * @author Marko Urm
 */
public class CreateWorldRequest {
    
    private int width = 1;
    private int height = 1;
    
    public int getWidth() {
        return width;
    }
    
    public void setWidth(int width) {
        this.width = width;
    }
    
    public int getHeight() {
        return height;
    }
    
    public void setHeight(int height) {
        this.height = height;
    }

    @Override
    public String toString() {
        return "CreateWorldRequest [width=" + width + ", height=" + height + "]";
    }
    
}
