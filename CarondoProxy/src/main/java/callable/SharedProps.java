/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package callable;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

/**
 *
 * @author Jesper
 */
public class SharedProps {

    protected String color;
    protected String eco;
    protected int minSize;
    protected int maxSize;
    protected int minPrice;
    protected int maxPrice;
    protected Gson gson = new GsonBuilder().setPrettyPrinting().create();

    public SharedProps(String color, String eco, int minSize, int maxSize, int minPrice, int maxPrice) {
        this.color = color;
        this.eco = eco;
        this.minSize = minSize;
        this.maxSize = maxSize;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
    }

    protected String getFieldValueAsString(JsonElement j, String fieldName) {
        try {
            return j.getAsJsonObject().get(fieldName).getAsString();
        } catch (Exception e) {
            return null;
        }
    }

    protected int getFieldValueAsInt(JsonElement j, String fieldName) {
        return j.getAsJsonObject().get(fieldName).getAsInt();
    }

    protected JsonObject getFieldValueAsJsonObject(JsonElement j, String fieldName) {
        return j.getAsJsonObject().get(fieldName).getAsJsonObject();
    }

    protected boolean getFieldValueAsBoolean(JsonElement j, String fieldName) {
        return j.getAsJsonObject().get(fieldName).getAsBoolean();

    }
    
    protected double getFieldValueAsDouble(JsonElement j, String fieldName){
        return j.getAsJsonObject().get(fieldName).getAsDouble();
    }

}
