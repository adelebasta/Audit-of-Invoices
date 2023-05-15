package com.example;

import java.io.File;
import java.io.FileOutputStream;

import org.mustangproject.ZUGFeRD.ZUGFeRDExportException;
import org.mustangproject.ZUGFeRD.ZUGFeRDInvoiceImporter;

public class MustangTest {
    public static void main(String[] args) {
        System.out.println("Accessing PDF at path: ");
        String pdfpath = args[0];
        // String pdfpath = "backend/test/RG_195_131013_5209277.pdf";
        String xmlpath = pdfpath.substring(0, pdfpath.length() - 4) + ".xml";

        System.out.println(pdfpath);

        try (FileOutputStream outputStream = new FileOutputStream(xmlpath);) {
            ZUGFeRDInvoiceImporter pdf = new ZUGFeRDInvoiceImporter(pdfpath);
            System.out.println("Extracting invoice XML...");
            byte[] bytes = pdf.getRawXML();
            outputStream.write(bytes);
            outputStream.close();
            System.out.println("XML extracted to: " + xmlpath);
        } catch (ZUGFeRDExportException e) {
            deleteXML(xmlpath, e, "!!Fehlermeldung!!: Datei " + pdfpath + " wurde nicht gefunden.");
        } catch (NullPointerException e) {
            deleteXML(xmlpath, e, "!!Fehlermeldung!!: keine valide XML in der PDF.");
        } catch (Exception e) {
            deleteXML(xmlpath, e, "!!Fehlermeldung!!:");
        }
    }

    public static void deleteXML(String xmlpath, Exception e, String error) {
        System.out.println(error);
        e.printStackTrace();
        File file = new File(xmlpath);
        file.delete();
    }
}
