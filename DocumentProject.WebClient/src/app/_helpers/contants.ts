import { ApplicationName } from "../_models/application-name";

export class Constants {
  // public static ServerUrl = "https://localhost:7161/";
  public static ServerUrl =  "http://178.253.40.215/";
  public static ImagePrefixToDisplay = "data:image/jpeg;base64,";
  public static VideoPrefixToDisplay = "data:video/mp4;base64,";
  public static PdfPrefixToDisplay = "data:application/pdf;base64,"
  public static AudioPrefixToDisplay = "data:audio/mp3;base64,"



  public static applicationNames: ApplicationName[] = []; 
}