

class Data {
    constructor(){
        this.state = {
            centerMap :  {
              'อำนาจเจริญ' : { lng : 104.73957793 , lat : 15.91073831} ,
              'อ่างทอง' : { lng : 100.34974009499999 , lat : 14.62073169} ,
              'กรุงเทพมหานคร' : { lng : 100.633214325 , lat : 13.724293875} ,
              'บึงกาฬ' : { lng : 103.716212825 , lat : 18.10992165} ,
              'บุรีรัมย์' : { lng : 102.96903726 , lat : 14.9629353} ,
              'ฉะเชิงเทรา' : { lng : 101.419221625 , lat : 13.57758481} ,
              'ชัยนาท' : { lng : 100.035620195 , lat : 15.162217210000001} ,
              'ชัยภูมิ' : { lng : 101.88822151 , lat : 16.03011834} ,
              'จันทบุรี' : { lng : 102.11057178499999 , lat : 12.811007490000001} ,
              'เชียงใหม่' : { lng : 98.79047622499999 , lat : 18.695065225} ,
              'เชียงราย' : { lng : 99.91807929000001 , lat : 19.732488314999998} ,
              'ชลบุรี' : { lng : 101.18326318 , lat : 13.048595240000001} ,
              'ชุมพร' : { lng : 99.083125305 , lat : 10.317362205} ,
              'กาฬสินธุ์' : { lng : 103.66870042 , lat : 16.641815555} ,
              'กำแพงเพชร' : { lng : 99.53168782 , lat : 16.38294469} ,
              'กาญจนบุรี' : { lng : 99.03019581000001 , lat : 14.69313616} ,
              'ขอนแก่น' : { lng : 102.46704738 , lat : 16.36041469} ,
              'กระบี่' : { lng : 99.013295295 , lat : 8.074558435} ,
              'ลำปาง' : { lng : 99.50302167999999 , lat : 18.311565545} ,
              'ลำพูน' : { lng : 98.996182455 , lat : 18.067008765} ,
              'เลย' : { lng : 101.494353785 , lat : 17.48696885} ,
              'ลพบุรี' : { lng : 100.912198665 , lat : 15.20148614} ,
              'แม่ฮ่องสอน' : { lng : 97.99779065999999 , lat : 18.726128105} ,
              'มหาสารคาม' : { lng : 103.17358737 , lat : 16.024733435} ,
              'มุกดาหาร' : { lng : 104.52441537 , lat : 16.546079194999997} ,
              'นครนายก' : { lng : 101.209491785 , lat : 14.237038864999999} ,
              'นครปฐม' : { lng : 100.075793395 , lat : 13.91425744} ,
              'นครพนม' : { lng : 104.39443409 , lat : 17.405423565} ,
              'นครราชสีมา' : { lng : 102.096787215 , lat : 14.96418761} ,
              'นครสวรรค์' : { lng : 99.959797965 , lat : 15.621446015} ,
              'นครศรีธรรมราช' : { lng : 99.78549225 , lat : 8.582077285} ,
              'น่าน' : { lng : 100.847069005 , lat : 18.825536614999997} ,
              'นราธิวาส' : { lng : 101.73221223 , lat : 6.18385677} ,
              'หนองบัวลำภู' : { lng : 102.33042603999999 , lat : 17.232095604999998} ,
              'หนองคาย' : { lng : 102.734004995 , lat : 17.94950829} ,
              'นนทบุรี' : { lng : 100.414988685 , lat : 13.964581460000002} ,
              'ปทุมธานี' : { lng : 100.64173832 , lat : 14.09610276} ,
              'ปัตตานี' : { lng : 101.37111619000001 , lat : 6.75099256} ,
              'พังงา' : { lng : 98.169291915 , lat : 8.611633300000001} ,
              'พัทลุง' : { lng : 100.080701345 , lat : 7.498036655} ,
              'พะเยา' : { lng : 100.15575215 , lat : 19.27100877} ,
              'เพชรบูรณ์' : { lng : 101.21511015499999 , lat : 16.24814792} ,
              'เพชรบุรี' : { lng : 99.601301525 , lat : 12.953311424999999} ,
              'พิจิตร' : { lng : 100.39148177999999 , lat : 16.28370602} ,
              'พิษณุโลก' : { lng : 100.481697765 , lat : 17.031240009999998} ,
              'พระนครศรีอยุธยา' : { lng : 100.517968175 , lat : 14.39214323} ,
              'แพร่' : { lng : 99.95944156499999 , lat : 18.26151377} ,
              'ภูเก็ต' : { lng : 98.37061772 , lat : 7.83941745} ,
              'ปราจีนบุรี' : { lng : 101.631807805 , lat : 14.022420284999999} ,
              'ประจวบคีรีขันธ์' : { lng : 99.59002236 , lat : 11.799646245} ,
              'ระนอง' : { lng : 98.645431865 , lat : 10.046415745000001} ,
              'ราชบุรี' : { lng : 99.61573724 , lat : 13.555014385} ,
              'ระยอง' : { lng : 101.40775204 , lat : 12.838159274999999} ,
              'ร้อยเอ็ด' : { lng : 103.80744511500001 , lat : 15.938815009999999} ,
              'สระแก้ว' : { lng : 102.40756419 , lat : 13.71666279} ,
              'สกลนคร' : { lng : 103.842986525 , lat : 17.430600820000002} ,
              'สมุทรปราการ' : { lng : 100.70416915999999 , lat : 13.598304685} ,
              'สมุทรสาคร' : { lng : 100.223385995 , lat : 13.57500716} ,
              'สมุทรสงคราม' : { lng : 99.96546795500001 , lat : 13.37915469} ,
              'สระบุรี' : { lng : 101.01476675999999 , lat : 14.658653170000001} ,
              'สตูล' : { lng : 99.68713197 , lat : 6.813207225} ,
              'ศรีสะเกษ' : { lng : 104.405272935 , lat : 14.95533661} ,
              'สิงห์บุรี' : { lng : 100.3349872 , lat : 14.920802685} ,
              'สงขลา' : { lng : 100.57985595 , lat : 7.11452894} ,
              'สุโขทัย' : { lng : 99.71198058 , lat : 17.252185775} ,
              'สุพรรณบุรี' : { lng : 99.77922992 , lat : 14.572574255} ,
              'สุราษฎร์ธานี' : { lng : 99.26685435499999 , lat : 9.213526715} ,
              'สุรินทร์' : { lng : 103.59073649999999 , lat : 14.90477874} ,
              'ตาก' : { lng : 98.60469675499999 , lat : 16.52393533} ,
              'ตรัง' : { lng : 99.50075068 , lat : 7.492759940000001} ,
              'ตราด' : { lng : 102.579682085 , lat : 12.15948444} ,
              'อุบลราชธานี' : { lng : 105.00427438 , lat : 15.153748799999999} ,
              'อุดรธานี' : { lng : 102.84194048500001 , lat : 17.44473304} ,
              'อุทัยธานี' : { lng : 99.54534592499999 , lat : 15.370085745} ,
              'อุตรดิตถ์' : { lng : 100.543669505 , lat : 17.760106415} ,
              'ยะลา' : { lng : 101.22186698499999 , lat : 6.148106805} ,
              'ยโสธร' : { lng : 104.41123712999999 , lat : 15.819096045}} ,
        markerIcon : {"Market": "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
                        "Nature" : "src/img/pin.png"},
        province : ["กระบี่", "กรุงเทพมหานคร", "กาญจนบุรี", "กาฬสินธุ์", "กำแพงเพชร", "ขอนแก่น", "จันทบุรี", "ฉะเชิงเทรา", "ชลบุรี", "ชัยนาท", "ชัยภูมิ", "ชุมพร", "เชียงราย","เชียงใหม่", "ตรัง", "ตราด", "ตาก", "นครนายก", "นครปฐม", "นครพนม", "นครราชสีมา", "นครศรีธรรมราช", "นครสวรรค์", "นนทบุรี", "นราธิวาส", "น่าน", "บึงกาฬ", "บุรีรัมย", "ปทุมธานี", "ประจวบคีรีขันธ์", "ปราจีนบุรี", "ปัตตานี", "พระนครศรีอยุธยา", "พะเยา", "พังงา", "พัทลุง", "พิจิตร", "พิษณุโลก", "เพชรบุรี", "เพชรบูรณ์",   "แพร่", "ภูเก็ต", "มหาสารคาม", "มุกดาหาร","แม่ฮ่องสอน","ยะลา", "ยโสธร", "ระนอง", "ระยอง", "ราชบุรี", "ร้อยเอ็ด", "ลพบุรี", "ลำปาง", "ลำพูน","เลย", "ศรีสะเกษ", "สกลนคร", "สงขลา", "สตูล", "สมุทรปราการ", "สมุทรสงคราม", "สมุทรสาคร", "สระบุรี", "สระแก้ว", "สิงห์บุรี", "สุพรรณบุรี", "สุราษฎร์ธานี", "สุรินทร์", "สุโขทัย", "หนองคาย", "หนองบัวลำภู", "อำนาจเจริญ", "อุดรธานี", "อุตรดิตถ์", "อุทัยธานี", "อุบลราชธานี", "อ่างทอง"]
    
    }
}
}
export default Data