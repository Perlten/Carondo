/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package resource;

import exception.CarondoException;
import java.util.HashMap;

/**
 *
 * @author adamlass
 */
public class PurchaseLinks {

    private static HashMap<String, String> links = null;

    public static String getLink(String hash) throws CarondoException {
        try {
            return links.get(hash);

        } catch (Exception e) {
            throw new CarondoException("Getting purchase URL failed.", "Please try again!");
        }
    }

    public static String saveLink(String link) {
        if (links == null) {
            links = new HashMap<>();
        }
        String hash = "" + link.hashCode();

        if (!links.containsKey(hash)) {
            links.put(hash, link);
        }
        return hash;
    }

}
