require('custom-env').env('test');
describe('translate number to chiense characters', () => {
    const conv_num_as_string_to_chn_char = require('./translate-methods').conv_num_as_string_to_chn_char;
    test('conv_num_as_string_to_chn_char properly throws errors at invalid inputs', () => {
        expect(() => {conv_num_as_string_to_chn_char("sc","1234.fd")}).toThrow("Parameter for number is not a valid number");
        expect(() => {conv_num_as_string_to_chn_char("sc","1234.fd.33")}).toThrow("Parameter for number is not a valid number");
        expect(() => {conv_num_as_string_to_chn_char("sc","")}).toThrow("Parameter for number is not a valid number");
        
        expect(() => {conv_num_as_string_to_chn_char("","1234")}).toThrow("Invalid parameter use either \"sc\" for simplified chinese or \"tc\" for traditional chinese");
        expect(() => {conv_num_as_string_to_chn_char(null,"1234")}).toThrow("Invalid parameter use either \"sc\" for simplified chinese or \"tc\" for traditional chinese");
        expect(() => {conv_num_as_string_to_chn_char("cc","1234")}).toThrow("Invalid parameter use either \"sc\" for simplified chinese or \"tc\" for traditional chinese");
        
        expect(() => {conv_num_as_string_to_chn_char("tc","10000000000000")}).toThrow("Number is out of range must be between -9,999,999,999,999.99 to 9,999,999,999,999.99");
        expect(() => {conv_num_as_string_to_chn_char("tc","-10000000000000")}).toThrow("Number is out of range must be between -9,999,999,999,999.99 to 9,999,999,999,999.99");
    });
    test('properly translates numbers ones [-9.99,9.99] in both simplified and traditional chinese', () => {
        expect(conv_num_as_string_to_chn_char("sc", "-1")).toBe("负一");
        expect(conv_num_as_string_to_chn_char("sc", "-2")).toBe("负二");
        expect(conv_num_as_string_to_chn_char("sc", "-3")).toBe("负三");
        expect(conv_num_as_string_to_chn_char("sc", "-4")).toBe("负四");
        expect(conv_num_as_string_to_chn_char("sc", "-5")).toBe("负五");
        expect(conv_num_as_string_to_chn_char("sc", "-6")).toBe("负六");
        expect(conv_num_as_string_to_chn_char("sc", "-7")).toBe("负七");
        expect(conv_num_as_string_to_chn_char("sc", "-8")).toBe("负八");
        expect(conv_num_as_string_to_chn_char("sc", "-9")).toBe("负九");
        
        expect(conv_num_as_string_to_chn_char("sc", "-3.06")).toBe("负三点零六");
        expect(conv_num_as_string_to_chn_char("sc", "-9.99")).toBe("负九点九九");
        
        expect(conv_num_as_string_to_chn_char("sc", "0")).toBe("零");
        expect(conv_num_as_string_to_chn_char("sc", "1")).toBe("一");
        expect(conv_num_as_string_to_chn_char("sc", "2")).toBe("二");
        expect(conv_num_as_string_to_chn_char("sc", "3")).toBe("三");
        expect(conv_num_as_string_to_chn_char("sc", "4")).toBe("四");
        expect(conv_num_as_string_to_chn_char("sc", "5")).toBe("五");
        expect(conv_num_as_string_to_chn_char("sc", "6")).toBe("六");
        expect(conv_num_as_string_to_chn_char("sc", "7")).toBe("七");
        expect(conv_num_as_string_to_chn_char("sc", "8")).toBe("八");
        expect(conv_num_as_string_to_chn_char("sc", "9")).toBe("九");
        expect(conv_num_as_string_to_chn_char("sc", "3.06")).toBe("三点零六");
        expect(conv_num_as_string_to_chn_char("sc", "9.99")).toBe("九点九九");
        
        // ---------------------- traditional chinese --------------------------//
        expect(conv_num_as_string_to_chn_char("tc", "-1")).toBe("負一");
        expect(conv_num_as_string_to_chn_char("tc", "-2")).toBe("負二");
        expect(conv_num_as_string_to_chn_char("tc", "-3")).toBe("負三");
        expect(conv_num_as_string_to_chn_char("tc", "-4")).toBe("負四");
        expect(conv_num_as_string_to_chn_char("tc", "-5")).toBe("負五");
        expect(conv_num_as_string_to_chn_char("tc", "-6")).toBe("負六");
        expect(conv_num_as_string_to_chn_char("tc", "-7")).toBe("負七");
        expect(conv_num_as_string_to_chn_char("tc", "-8")).toBe("負八");
        expect(conv_num_as_string_to_chn_char("tc", "-9")).toBe("負九");
        
        expect(conv_num_as_string_to_chn_char("tc", "-3.06")).toBe("負三點零六");
        expect(conv_num_as_string_to_chn_char("tc", "-9.99")).toBe("負九點九九"); 
        
        expect(conv_num_as_string_to_chn_char("tc", "0")).toBe("零")
        expect(conv_num_as_string_to_chn_char("tc", "1")).toBe("一");
        expect(conv_num_as_string_to_chn_char("tc", "2")).toBe("二");
        expect(conv_num_as_string_to_chn_char("tc", "3")).toBe("三");
        expect(conv_num_as_string_to_chn_char("tc", "4")).toBe("四");
        expect(conv_num_as_string_to_chn_char("tc", "5")).toBe("五");
        expect(conv_num_as_string_to_chn_char("tc", "6")).toBe("六");
        expect(conv_num_as_string_to_chn_char("tc", "7")).toBe("七");
        expect(conv_num_as_string_to_chn_char("tc", "8")).toBe("八");
        expect(conv_num_as_string_to_chn_char("tc", "9")).toBe("九");
        
        expect(conv_num_as_string_to_chn_char("tc", "3.06")).toBe("三點零六");
        expect(conv_num_as_string_to_chn_char("tc", "9.99")).toBe("九點九九"); 
    });

    test('properly translates tens [-99, -10] U [10-99] in both simplified and traditional chinese', () => {
        expect(conv_num_as_string_to_chn_char("sc", "-10")).toBe("负十");
        expect(conv_num_as_string_to_chn_char("sc", "-11")).toBe("负十一");
        expect(conv_num_as_string_to_chn_char("sc", "-12")).toBe("负十二");
        expect(conv_num_as_string_to_chn_char("sc", "-15")).toBe("负十五");
        expect(conv_num_as_string_to_chn_char("sc", "-19")).toBe("负十九");
        expect(conv_num_as_string_to_chn_char("sc", "-20")).toBe("负二十");
        expect(conv_num_as_string_to_chn_char("sc", "-22")).toBe("负二十二");
        expect(conv_num_as_string_to_chn_char("sc", "-23")).toBe("负二十三");
        expect(conv_num_as_string_to_chn_char("sc", "-28")).toBe("负二十八");
        expect(conv_num_as_string_to_chn_char("sc", "-60")).toBe("负六十");
        expect(conv_num_as_string_to_chn_char("sc", "-67")).toBe("负六十七");
        expect(conv_num_as_string_to_chn_char("sc", "-90")).toBe("负九十");
        expect(conv_num_as_string_to_chn_char("sc", "-99")).toBe("负九十九");

        expect(conv_num_as_string_to_chn_char("sc", "10")).toBe("十");
        expect(conv_num_as_string_to_chn_char("sc", "11")).toBe("十一");
        expect(conv_num_as_string_to_chn_char("sc", "12")).toBe("十二");
        expect(conv_num_as_string_to_chn_char("sc", "15")).toBe("十五");
        expect(conv_num_as_string_to_chn_char("sc", "19")).toBe("十九");
        expect(conv_num_as_string_to_chn_char("sc", "20")).toBe("二十");
        expect(conv_num_as_string_to_chn_char("sc", "22")).toBe("二十二");
        expect(conv_num_as_string_to_chn_char("sc", "23")).toBe("二十三");
        expect(conv_num_as_string_to_chn_char("sc", "28")).toBe("二十八");
        expect(conv_num_as_string_to_chn_char("sc", "60")).toBe("六十");
        expect(conv_num_as_string_to_chn_char("sc", "67")).toBe("六十七");
        expect(conv_num_as_string_to_chn_char("sc", "90")).toBe("九十");
        expect(conv_num_as_string_to_chn_char("sc", "99")).toBe("九十九");
        // ---------------------- traditional chinese --------------------------//
        expect(conv_num_as_string_to_chn_char("tc", "-10")).toBe("負十");
        expect(conv_num_as_string_to_chn_char("tc", "-11")).toBe("負十一");
        expect(conv_num_as_string_to_chn_char("tc", "-12")).toBe("負十二")
        expect(conv_num_as_string_to_chn_char("tc", "-15")).toBe("負十五");
        expect(conv_num_as_string_to_chn_char("tc", "-19")).toBe("負十九");
        expect(conv_num_as_string_to_chn_char("tc", "-20")).toBe("負二十");
        expect(conv_num_as_string_to_chn_char("tc", "-22")).toBe("負二十二");
        expect(conv_num_as_string_to_chn_char("tc", "-24")).toBe("負二十四");
        expect(conv_num_as_string_to_chn_char("tc", "-28")).toBe("負二十八");
        expect(conv_num_as_string_to_chn_char("tc", "-60")).toBe("負六十");
        expect(conv_num_as_string_to_chn_char("tc", "-67")).toBe("負六十七");
        expect(conv_num_as_string_to_chn_char("tc", "-90")).toBe("負九十");
        expect(conv_num_as_string_to_chn_char("tc", "-99")).toBe("負九十九");

        expect(conv_num_as_string_to_chn_char("tc", "10")).toBe("十");
        expect(conv_num_as_string_to_chn_char("tc", "11")).toBe("十一");
        expect(conv_num_as_string_to_chn_char("tc", "12")).toBe("十二")
        expect(conv_num_as_string_to_chn_char("tc", "15")).toBe("十五");
        expect(conv_num_as_string_to_chn_char("tc", "19")).toBe("十九");
        expect(conv_num_as_string_to_chn_char("tc", "20")).toBe("二十");
        expect(conv_num_as_string_to_chn_char("tc", "22")).toBe("二十二");
        expect(conv_num_as_string_to_chn_char("tc", "24")).toBe("二十四");
        expect(conv_num_as_string_to_chn_char("tc", "28")).toBe("二十八");
        expect(conv_num_as_string_to_chn_char("tc", "60")).toBe("六十");
        expect(conv_num_as_string_to_chn_char("tc", "67")).toBe("六十七");
        expect(conv_num_as_string_to_chn_char("tc", "90")).toBe("九十");
        expect(conv_num_as_string_to_chn_char("tc", "99")).toBe("九十九");
    });

    test('properly translates hundreds [-999, 100] U [100, 999] in both simplified and traditional chinese', () => {
        expect(conv_num_as_string_to_chn_char("sc", "-100")).toBe("负一百");
        expect(conv_num_as_string_to_chn_char("sc", "-101")).toBe("负一百零一");
        expect(conv_num_as_string_to_chn_char("sc", "-110")).toBe("负一百一十");
        expect(conv_num_as_string_to_chn_char("sc", "-121")).toBe("负一百二十一");
        expect(conv_num_as_string_to_chn_char("sc", "-155")).toBe("负一百五十五");
        expect(conv_num_as_string_to_chn_char("sc", "-222")).toBe("负两百二十二");
        expect(conv_num_as_string_to_chn_char("sc", "-317")).toBe("负三百一十七");
        expect(conv_num_as_string_to_chn_char("sc", "-999")).toBe("负九百九十九");
        
        expect(conv_num_as_string_to_chn_char("sc", "100")).toBe("一百");
        expect(conv_num_as_string_to_chn_char("sc", "101")).toBe("一百零一");
        expect(conv_num_as_string_to_chn_char("sc", "110")).toBe("一百一十");
        expect(conv_num_as_string_to_chn_char("sc", "121")).toBe("一百二十一");
        expect(conv_num_as_string_to_chn_char("sc", "155")).toBe("一百五十五");
        expect(conv_num_as_string_to_chn_char("sc", "222")).toBe("两百二十二");
        expect(conv_num_as_string_to_chn_char("sc", "317")).toBe("三百一十七");
        expect(conv_num_as_string_to_chn_char("sc", "999")).toBe("九百九十九");

        // ---------------------- traditional chinese --------------------------//
        expect(conv_num_as_string_to_chn_char("tc", "-100")).toBe("負一百");
        expect(conv_num_as_string_to_chn_char("tc", "-101")).toBe("負一百零一");
        expect(conv_num_as_string_to_chn_char("tc", "-110")).toBe("負一百一十");
        expect(conv_num_as_string_to_chn_char("tc", "-121")).toBe("負一百二十一");
        expect(conv_num_as_string_to_chn_char("tc", "-155")).toBe("負一百五十五");
        expect(conv_num_as_string_to_chn_char("tc", "-222")).toBe("負兩百二十二");
        expect(conv_num_as_string_to_chn_char("tc", "-317")).toBe("負三百一十七");
        expect(conv_num_as_string_to_chn_char("tc", "-999")).toBe("負九百九十九");
    
        expect(conv_num_as_string_to_chn_char("tc", "100")).toBe("一百");
        expect(conv_num_as_string_to_chn_char("tc", "101")).toBe("一百零一");
        expect(conv_num_as_string_to_chn_char("tc", "110")).toBe("一百一十");
        expect(conv_num_as_string_to_chn_char("tc", "121")).toBe("一百二十一");
        expect(conv_num_as_string_to_chn_char("tc", "155")).toBe("一百五十五");
        expect(conv_num_as_string_to_chn_char("tc", "222")).toBe("兩百二十二");
        expect(conv_num_as_string_to_chn_char("tc", "317")).toBe("三百一十七");
        expect(conv_num_as_string_to_chn_char("tc", "999")).toBe("九百九十九");

    });

    test('properly translate thousands [-9999, -1000] U [1000, 9999] in both simplified and traditional chinese', () => {
        expect(conv_num_as_string_to_chn_char("sc", "-1000")).toBe("负一千");
        expect(conv_num_as_string_to_chn_char("sc", "-1004")).toBe("负一千零四");
        expect(conv_num_as_string_to_chn_char("sc", "-2090")).toBe("负两千零九十");
        expect(conv_num_as_string_to_chn_char("sc", "-2222")).toBe("负两千两百二十二");
        expect(conv_num_as_string_to_chn_char("sc", "-3075")).toBe("负三千零七十五");
        expect(conv_num_as_string_to_chn_char("sc", "-4200")).toBe("负四千两百");
        expect(conv_num_as_string_to_chn_char("sc", "-5102")).toBe("负五千一百零二");
        expect(conv_num_as_string_to_chn_char("sc", "-6320")).toBe("负六千三百二十");
        expect(conv_num_as_string_to_chn_char("sc", "-7438")).toBe("负七千四百三十八");
        expect(conv_num_as_string_to_chn_char("sc", "-9999")).toBe("负九千九百九十九");
        
        expect(conv_num_as_string_to_chn_char("sc", "1000")).toBe("一千");
        expect(conv_num_as_string_to_chn_char("sc", "1004")).toBe("一千零四");
        expect(conv_num_as_string_to_chn_char("sc", "2090")).toBe("两千零九十");
        expect(conv_num_as_string_to_chn_char("sc", "2222")).toBe("两千两百二十二");
        expect(conv_num_as_string_to_chn_char("sc", "3075")).toBe("三千零七十五");
        expect(conv_num_as_string_to_chn_char("sc", "4200")).toBe("四千两百");
        expect(conv_num_as_string_to_chn_char("sc", "5102")).toBe("五千一百零二");
        expect(conv_num_as_string_to_chn_char("sc", "6320")).toBe("六千三百二十");
        expect(conv_num_as_string_to_chn_char("sc", "7438")).toBe("七千四百三十八");
        expect(conv_num_as_string_to_chn_char("sc", "9999")).toBe("九千九百九十九");

        // ---------------------- traditional chinese --------------------------//
        expect(conv_num_as_string_to_chn_char("tc", "-1000")).toBe("負一千");
        expect(conv_num_as_string_to_chn_char("tc", "-1004")).toBe("負一千零四");
        expect(conv_num_as_string_to_chn_char("tc", "-2090")).toBe("負兩千零九十");
        expect(conv_num_as_string_to_chn_char("tc", "-2222")).toBe("負兩千兩百二十二");
        expect(conv_num_as_string_to_chn_char("tc", "-3075")).toBe("負三千零七十五");
        expect(conv_num_as_string_to_chn_char("tc", "-4200")).toBe("負四千兩百");
        expect(conv_num_as_string_to_chn_char("tc", "-5102")).toBe("負五千一百零二");
        expect(conv_num_as_string_to_chn_char("tc", "-6320")).toBe("負六千三百二十");
        expect(conv_num_as_string_to_chn_char("tc", "-7438")).toBe("負七千四百三十八");
        expect(conv_num_as_string_to_chn_char("tc", "-9999")).toBe("負九千九百九十九");
        
        expect(conv_num_as_string_to_chn_char("tc", "1000")).toBe("一千");
        expect(conv_num_as_string_to_chn_char("tc", "1004")).toBe("一千零四");
        expect(conv_num_as_string_to_chn_char("tc", "2090")).toBe("兩千零九十");
        expect(conv_num_as_string_to_chn_char("tc", "2222")).toBe("兩千兩百二十二");
        expect(conv_num_as_string_to_chn_char("tc", "3075")).toBe("三千零七十五");
        expect(conv_num_as_string_to_chn_char("tc", "4200")).toBe("四千兩百");
        expect(conv_num_as_string_to_chn_char("tc", "5102")).toBe("五千一百零二");
        expect(conv_num_as_string_to_chn_char("tc", "6320")).toBe("六千三百二十");
        expect(conv_num_as_string_to_chn_char("tc", "7438")).toBe("七千四百三十八");
        expect(conv_num_as_string_to_chn_char("tc", "9999")).toBe("九千九百九十九");
    });

    test('properly translate ten thousands [-99,999,999 , -10,000] U [10,000 , 99,999,999] in both simplified and traditional chinese', () => {
        // ten-thousand case
        expect(conv_num_as_string_to_chn_char("sc", "-10000")).toBe("负一万");
        expect(conv_num_as_string_to_chn_char("sc", "-70000")).toBe("负七万");
        expect(conv_num_as_string_to_chn_char("sc", "-80003")).toBe("负八万零三");
        expect(conv_num_as_string_to_chn_char("sc", "-90021")).toBe("负九万零二十一");
        expect(conv_num_as_string_to_chn_char("sc", "-60100")).toBe("负六万零一百");
        expect(conv_num_as_string_to_chn_char("sc", "-50203")).toBe("负五万零两百零三");
        expect(conv_num_as_string_to_chn_char("sc", "-40125")).toBe("负四万零一百二十五");
        expect(conv_num_as_string_to_chn_char("sc", "-33000")).toBe("负三万三千");
        expect(conv_num_as_string_to_chn_char("sc", "-21004")).toBe("负两万一千零四");
        expect(conv_num_as_string_to_chn_char("sc", "-17080")).toBe("负一万七千零八十");
        expect(conv_num_as_string_to_chn_char("sc", "-88091")).toBe("负八万八千零九十一");
        expect(conv_num_as_string_to_chn_char("sc", "-79100")).toBe("负七万九千一百");
        expect(conv_num_as_string_to_chn_char("sc", "-68202")).toBe("负六万八千两百零二");
        expect(conv_num_as_string_to_chn_char("sc", "-52411")).toBe("负五万两千四百一十一");
        expect(conv_num_as_string_to_chn_char("sc", "-43320")).toBe("负四万三千三百二十");
        expect(conv_num_as_string_to_chn_char("sc", "-99999")).toBe("负九万九千九百九十九");
        // ten ten-thousands case (one hundred thousand)
        expect(conv_num_as_string_to_chn_char("sc", "-100000")).toBe("负十万");
        expect(conv_num_as_string_to_chn_char("sc", "-200000")).toBe("负二十万");
        expect(conv_num_as_string_to_chn_char("sc", "-315221")).toBe("负三十一万五千两百二十一");
        expect(conv_num_as_string_to_chn_char("sc", "-420778")).toBe("负四十二万零七百七十八");
        // hundred ten-thousand case (one million)
        expect(conv_num_as_string_to_chn_char("sc", "-2222478")).toBe("负两百二十二万两千四百七十八");
        expect(conv_num_as_string_to_chn_char("sc", "-3007019")).toBe("负三百万七千零一十九");
        expect(conv_num_as_string_to_chn_char("sc", "-3017019")).toBe("负三百零一万七千零一十九");
        // thousand ten-million case (ten million)
        expect(conv_num_as_string_to_chn_char("sc", "-70002381")).toBe("负七千万两千三百八十一");
        expect(conv_num_as_string_to_chn_char("sc", "-81235416")).toBe("负八千一百二十三万五千四百一十六");
        expect(conv_num_as_string_to_chn_char("sc", "-90667110")).toBe("负九千零六十六万七千一百一十");

        expect(conv_num_as_string_to_chn_char("sc", "10000")).toBe("一万");
        expect(conv_num_as_string_to_chn_char("sc", "70000")).toBe("七万");
        expect(conv_num_as_string_to_chn_char("sc", "80003")).toBe("八万零三");
        expect(conv_num_as_string_to_chn_char("sc", "90021")).toBe("九万零二十一");
        expect(conv_num_as_string_to_chn_char("sc", "60100")).toBe("六万零一百");
        expect(conv_num_as_string_to_chn_char("sc", "50203")).toBe("五万零两百零三");
        expect(conv_num_as_string_to_chn_char("sc", "40125")).toBe("四万零一百二十五");
        expect(conv_num_as_string_to_chn_char("sc", "33000")).toBe("三万三千");
        expect(conv_num_as_string_to_chn_char("sc", "21004")).toBe("两万一千零四");
        expect(conv_num_as_string_to_chn_char("sc", "17080")).toBe("一万七千零八十");
        expect(conv_num_as_string_to_chn_char("sc", "88091")).toBe("八万八千零九十一");
        expect(conv_num_as_string_to_chn_char("sc", "79100")).toBe("七万九千一百");
        expect(conv_num_as_string_to_chn_char("sc", "68202")).toBe("六万八千两百零二");
        expect(conv_num_as_string_to_chn_char("sc", "52411")).toBe("五万两千四百一十一");
        expect(conv_num_as_string_to_chn_char("sc", "43320")).toBe("四万三千三百二十");
        expect(conv_num_as_string_to_chn_char("sc", "99999")).toBe("九万九千九百九十九");
        // ten ten-thousands case (one hundred thousand)
        expect(conv_num_as_string_to_chn_char("sc", "100000")).toBe("十万");
        expect(conv_num_as_string_to_chn_char("sc", "200000")).toBe("二十万");
        expect(conv_num_as_string_to_chn_char("sc", "315221")).toBe("三十一万五千两百二十一");
        expect(conv_num_as_string_to_chn_char("sc", "420778")).toBe("四十二万零七百七十八");
        // hundred ten-thousand case (one million)
        expect(conv_num_as_string_to_chn_char("sc", "2222478")).toBe("两百二十二万两千四百七十八");
        expect(conv_num_as_string_to_chn_char("sc", "3007019")).toBe("三百万七千零一十九");
        expect(conv_num_as_string_to_chn_char("sc", "3017019")).toBe("三百零一万七千零一十九");
        // thousand ten-million case (ten million)
        expect(conv_num_as_string_to_chn_char("sc", "70002381")).toBe("七千万两千三百八十一");
        expect(conv_num_as_string_to_chn_char("sc", "81235416")).toBe("八千一百二十三万五千四百一十六");
        expect(conv_num_as_string_to_chn_char("sc", "90667110")).toBe("九千零六十六万七千一百一十");
        
        // ---------------------- traditional chinese --------------------------//
        expect(conv_num_as_string_to_chn_char("tc", "-10000")).toBe("負一萬");
        expect(conv_num_as_string_to_chn_char("tc", "-70000")).toBe("負七萬");
        expect(conv_num_as_string_to_chn_char("tc", "-80003")).toBe("負八萬零三");
        expect(conv_num_as_string_to_chn_char("tc", "-90021")).toBe("負九萬零二十一");
        expect(conv_num_as_string_to_chn_char("tc", "-60100")).toBe("負六萬零一百");
        expect(conv_num_as_string_to_chn_char("tc", "-50203")).toBe("負五萬零兩百零三");
        expect(conv_num_as_string_to_chn_char("tc", "-40125")).toBe("負四萬零一百二十五");
        expect(conv_num_as_string_to_chn_char("tc", "-33000")).toBe("負三萬三千");
        expect(conv_num_as_string_to_chn_char("tc", "-21004")).toBe("負兩萬一千零四");
        expect(conv_num_as_string_to_chn_char("tc", "-17080")).toBe("負一萬七千零八十");
        expect(conv_num_as_string_to_chn_char("tc", "-88091")).toBe("負八萬八千零九十一");
        expect(conv_num_as_string_to_chn_char("tc", "-79100")).toBe("負七萬九千一百");
        expect(conv_num_as_string_to_chn_char("tc", "-68202")).toBe("負六萬八千兩百零二");
        expect(conv_num_as_string_to_chn_char("tc", "-52411")).toBe("負五萬兩千四百一十一");
        expect(conv_num_as_string_to_chn_char("tc", "-43320")).toBe("負四萬三千三百二十");
        expect(conv_num_as_string_to_chn_char("tc", "-99999")).toBe("負九萬九千九百九十九");

        // ten ten-thousands case (one hundred thousand)
        expect(conv_num_as_string_to_chn_char("tc", "-100000")).toBe("負十萬");
        expect(conv_num_as_string_to_chn_char("tc", "-200000")).toBe("負二十萬");
        expect(conv_num_as_string_to_chn_char("tc", "-315221")).toBe("負三十一萬五千兩百二十一");
        expect(conv_num_as_string_to_chn_char("tc", "-420778")).toBe("負四十二萬零七百七十八");
        // hundred ten-thousand case (one million)
        expect(conv_num_as_string_to_chn_char("tc", "-2222478")).toBe("負兩百二十二萬兩千四百七十八");
        expect(conv_num_as_string_to_chn_char("tc", "-3007019")).toBe("負三百萬七千零一十九");
        expect(conv_num_as_string_to_chn_char("tc", "-3017019")).toBe("負三百零一萬七千零一十九");
        // thousand ten-million case (ten million)
        expect(conv_num_as_string_to_chn_char("tc", "-70002381")).toBe("負七千萬兩千三百八十一");
        expect(conv_num_as_string_to_chn_char("tc", "-81235416")).toBe("負八千一百二十三萬五千四百一十六");
        expect(conv_num_as_string_to_chn_char("tc", "-90667110")).toBe("負九千零六十六萬七千一百一十");
        expect(conv_num_as_string_to_chn_char("tc", "-99999999")).toBe("負九千九百九十九萬九千九百九十九");

        expect(conv_num_as_string_to_chn_char("tc", "10000")).toBe("一萬");
        expect(conv_num_as_string_to_chn_char("tc", "70000")).toBe("七萬");
        expect(conv_num_as_string_to_chn_char("tc", "80003")).toBe("八萬零三");
        expect(conv_num_as_string_to_chn_char("tc", "90021")).toBe("九萬零二十一");
        expect(conv_num_as_string_to_chn_char("tc", "60100")).toBe("六萬零一百");
        expect(conv_num_as_string_to_chn_char("tc", "50203")).toBe("五萬零兩百零三");
        expect(conv_num_as_string_to_chn_char("tc", "40125")).toBe("四萬零一百二十五");
        expect(conv_num_as_string_to_chn_char("tc", "33000")).toBe("三萬三千");
        expect(conv_num_as_string_to_chn_char("tc", "21004")).toBe("兩萬一千零四");
        expect(conv_num_as_string_to_chn_char("tc", "17080")).toBe("一萬七千零八十");
        expect(conv_num_as_string_to_chn_char("tc", "88091")).toBe("八萬八千零九十一");
        expect(conv_num_as_string_to_chn_char("tc", "79100")).toBe("七萬九千一百");
        expect(conv_num_as_string_to_chn_char("tc", "68202")).toBe("六萬八千兩百零二");
        expect(conv_num_as_string_to_chn_char("tc", "52411")).toBe("五萬兩千四百一十一");
        expect(conv_num_as_string_to_chn_char("tc", "43320")).toBe("四萬三千三百二十");
        expect(conv_num_as_string_to_chn_char("tc", "99999")).toBe("九萬九千九百九十九");

        // ten ten-thousands case (one hundred thousand)
        expect(conv_num_as_string_to_chn_char("tc", "100000")).toBe("十萬");
        expect(conv_num_as_string_to_chn_char("tc", "200000")).toBe("二十萬");
        expect(conv_num_as_string_to_chn_char("tc", "315221")).toBe("三十一萬五千兩百二十一");
        expect(conv_num_as_string_to_chn_char("tc", "420778")).toBe("四十二萬零七百七十八");
        // hundred ten-thousand case (one million)
        expect(conv_num_as_string_to_chn_char("tc", "2222478")).toBe("兩百二十二萬兩千四百七十八");
        expect(conv_num_as_string_to_chn_char("tc", "3007019")).toBe("三百萬七千零一十九");
        expect(conv_num_as_string_to_chn_char("tc", "3017019")).toBe("三百零一萬七千零一十九");
        // thousand ten-million case (ten million)
        expect(conv_num_as_string_to_chn_char("tc", "70002381")).toBe("七千萬兩千三百八十一");
        expect(conv_num_as_string_to_chn_char("tc", "81235416")).toBe("八千一百二十三萬五千四百一十六");
        expect(conv_num_as_string_to_chn_char("tc", "90667110")).toBe("九千零六十六萬七千一百一十");
        expect(conv_num_as_string_to_chn_char("tc", "99999999")).toBe("九千九百九十九萬九千九百九十九");
    });

    test('properly translate hundred million [-99,999,999,999 , -100,000,000] U [100,000,000 , 99,999,999,999]', () => {
        expect(conv_num_as_string_to_chn_char("sc", "-100000000")).toBe("负一亿");
        expect(conv_num_as_string_to_chn_char("sc", "-400005213")).toBe("负四亿零五千两百一十三");
        expect(conv_num_as_string_to_chn_char("sc", "-520006771")).toBe("负五亿两千万六千七百七十一");
        // tens hundred-million case (one billion)
        expect(conv_num_as_string_to_chn_char("sc", "-1356914622")).toBe("负十三亿五千六百九十一万四千六百二十二");
        expect(conv_num_as_string_to_chn_char("sc", "-6200314622")).toBe("负六十二亿零三十一万四千六百二十二");
        // hundred hundred-million case (ten billion)
        expect(conv_num_as_string_to_chn_char("sc", "-20107100771")).toBe("负两百零一亿零七百一十万零七百七十一");
        // thousand hundred-million case (hundred billion)
        expect(conv_num_as_string_to_chn_char("sc", "-147825639102")).toBe("负一千四百七十八亿两千五百六十三万九千一百零二");
        expect(conv_num_as_string_to_chn_char("sc", "-999999999999")).toBe("负九千九百九十九亿九千九百九十九万九千九百九十九");
        
        expect(conv_num_as_string_to_chn_char("sc", "100000000")).toBe("一亿");
        expect(conv_num_as_string_to_chn_char("sc", "400005213")).toBe("四亿零五千两百一十三");
        expect(conv_num_as_string_to_chn_char("sc", "520006771")).toBe("五亿两千万六千七百七十一");
        // tens hundred-million case (one billion)
        expect(conv_num_as_string_to_chn_char("sc", "1356914622")).toBe("十三亿五千六百九十一万四千六百二十二");
        expect(conv_num_as_string_to_chn_char("sc", "6200314622")).toBe("六十二亿零三十一万四千六百二十二");
        // hundred hundred-million case (ten billion)
        expect(conv_num_as_string_to_chn_char("sc", "20107100771")).toBe("两百零一亿零七百一十万零七百七十一");
        // thousand hundred-million case (hundred billion)
        expect(conv_num_as_string_to_chn_char("sc", "147825639102")).toBe("一千四百七十八亿两千五百六十三万九千一百零二");
        expect(conv_num_as_string_to_chn_char("sc", "999999999999")).toBe("九千九百九十九亿九千九百九十九万九千九百九十九");

        // ---------------------- traditional chinese --------------------------//
        expect(conv_num_as_string_to_chn_char("tc", "-100000000")).toBe("負一億");
        expect(conv_num_as_string_to_chn_char("tc", "-400005213")).toBe("負四億零五千兩百一十三");
        expect(conv_num_as_string_to_chn_char("tc", "-520006771")).toBe("負五億兩千萬六千七百七十一");
        // tens hundred-million case (one billion)
        expect(conv_num_as_string_to_chn_char("tc", "-1356914622")).toBe("負十三億五千六百九十一萬四千六百二十二");
        expect(conv_num_as_string_to_chn_char("tc", "-6200314622")).toBe("負六十二億零三十一萬四千六百二十二");
        // hundred hundred-million case (ten billion)
        expect(conv_num_as_string_to_chn_char("tc", "-20107100771")).toBe("負兩百零一億零七百一十萬零七百七十一");
        // thousand hundred-million case (hundred billion)
        expect(conv_num_as_string_to_chn_char("tc", "-147825639102")).toBe("負一千四百七十八億兩千五百六十三萬九千一百零二");
        expect(conv_num_as_string_to_chn_char("tc", "-999999999999")).toBe("負九千九百九十九億九千九百九十九萬九千九百九十九");
        
        expect(conv_num_as_string_to_chn_char("tc", "100000000")).toBe("一億");
        expect(conv_num_as_string_to_chn_char("tc", "400005213")).toBe("四億零五千兩百一十三");
        expect(conv_num_as_string_to_chn_char("tc", "520006771")).toBe("五億兩千萬六千七百七十一");
        // tens hundred-million case (one billion)
        expect(conv_num_as_string_to_chn_char("tc", "1356914622")).toBe("十三億五千六百九十一萬四千六百二十二");
        expect(conv_num_as_string_to_chn_char("tc", "6200314622")).toBe("六十二億零三十一萬四千六百二十二");
        // hundred hundred-million case (ten billion)
        expect(conv_num_as_string_to_chn_char("tc", "20107100771")).toBe("兩百零一億零七百一十萬零七百七十一");
        // thousand hundred-million case (hundred billion)
        expect(conv_num_as_string_to_chn_char("tc", "147825639102")).toBe("一千四百七十八億兩千五百六十三萬九千一百零二");
        expect(conv_num_as_string_to_chn_char("tc", "999999999999")).toBe("九千九百九十九億九千九百九十九萬九千九百九十九");
    });

    test('properly translate trillion[-9,999,999,999,999 , -1,000,000,000,000] U [1,000,000,000,000 , 9,999,999,999,999]', () => {
        expect(conv_num_as_string_to_chn_char("sc", "-1000000000000")).toBe("负一兆");
        expect(conv_num_as_string_to_chn_char("sc", "-2761992517134")).toBe("负两兆七千六百一十九亿九千两百五十一万七千一百三十四");
        expect(conv_num_as_string_to_chn_char("sc", "-9999999999999")).toBe("负九兆九千九百九十九亿九千九百九十九万九千九百九十九");
        
        expect(conv_num_as_string_to_chn_char("sc", "1000000000000")).toBe("一兆");
        expect(conv_num_as_string_to_chn_char("sc", "2761992517134")).toBe("两兆七千六百一十九亿九千两百五十一万七千一百三十四");
        expect(conv_num_as_string_to_chn_char("sc", "9999999999999")).toBe("九兆九千九百九十九亿九千九百九十九万九千九百九十九");

        expect(conv_num_as_string_to_chn_char("sc", "9999999999999.99")).toBe("九兆九千九百九十九亿九千九百九十九万九千九百九十九点九九"); 
        // ---------------------- traditional chinese --------------------------//
        expect(conv_num_as_string_to_chn_char("tc", "-1000000000000")).toBe("負一兆");
        expect(conv_num_as_string_to_chn_char("tc", "-2761992517134")).toBe("負兩兆七千六百一十九億九千兩百五十一萬七千一百三十四");
        expect(conv_num_as_string_to_chn_char("tc", "-9999999999999")).toBe("負九兆九千九百九十九億九千九百九十九萬九千九百九十九"); 

        expect(conv_num_as_string_to_chn_char("tc", "1000000000000")).toBe("一兆");
        expect(conv_num_as_string_to_chn_char("tc", "2761992517134")).toBe("兩兆七千六百一十九億九千兩百五十一萬七千一百三十四");
        expect(conv_num_as_string_to_chn_char("tc", "9999999999999")).toBe("九兆九千九百九十九億九千九百九十九萬九千九百九十九");
        
        expect(conv_num_as_string_to_chn_char("tc", "9999999999999.99")).toBe("九兆九千九百九十九億九千九百九十九萬九千九百九十九點九九"); 
    });
});
// since we know that method for translating a single number to chinese characters works
// we only need to check when array has 0 instances, 1 instance, multiple instances, valid instances, invalid instances for promise_translate_numbers_to_chinese_chars
describe('translate list of numbers to list of chinese characters', () => {
    const promise_translate_numbers_to_chinese_chars = require('./translate-methods').promise_translate_numbers_to_chinese_chars;
    test('translate list of numbers throw error on non array for array input', () => {
        return promise_translate_numbers_to_chinese_chars('non-array input', 'sc').catch(e => expect(e.message).toBe("numbers.forEach is not a function"));
    });
    test('translate list of numbers throw error on null for array input', () => {
        return promise_translate_numbers_to_chinese_chars(null, 'sc').catch(e => expect(e.message).toMatch(/Cannot read propert*/));
    });
    test('translate list of numbers throw error on empty array for array input', () => {
        return promise_translate_numbers_to_chinese_chars([], 'sc').catch(e => expect(e).toBe('numbers was empty'));
    });
    test('translate list of numbers throw error on array with invalid instance for array input', () => {
        return promise_translate_numbers_to_chinese_chars(['f'], 'sc').catch(e => expect(e.message).toBe('Parameter for number is not a valid number'));
    });
    test('translate list of numbers throw error on array with both a valid and an invalid instance for array input', () => {
        return promise_translate_numbers_to_chinese_chars(['12', 'f'], 'sc').catch(e => expect(e.message).toBe('Parameter for number is not a valid number'));
    });
    test('translate list of numbers throw error on array with both a valid and an invalid instance for array input', () => {
        return promise_translate_numbers_to_chinese_chars(['12', 'f'], 'jc').catch(e => expect(e.message).toBe('Invalid parameter use either \"sc\" for simplified chinese or \"tc\" for traditional chinese'));
    });
    test('translate list of numbers translate list of one instance for array input, "sc" chars for chinese character type', () => {
        return promise_translate_numbers_to_chinese_chars(['135.6'], 'sc').then(data => {
            expect(data).toStrictEqual(['一百三十五点六']);
        });
    });
    test('translate list of numbers translate list of one instance for array input, "tc" chars for chinese character type', () => {
        return promise_translate_numbers_to_chinese_chars(['-3922'], 'tc').then(data => {
            expect(data).toStrictEqual(['負三千九百二十二']);
        });
    });
    test('translate list of numbers translate list of multiple instance for array input, "sc" chars for chinese character type', () => {
        return promise_translate_numbers_to_chinese_chars(['12', '-0.04', '532004312.1'], 'sc').then(data => {
            expect(data).toStrictEqual(['十二', '负零点零四', '五亿三千两百万四千三百一十二点一']);
        });
    });
    test('translate list of numbers translate list of multiple instance for array input, "tc" chars for chinese character type', () => {
        return promise_translate_numbers_to_chinese_chars(['12', '-0.04', '532004312.1'], 'tc').then(data => {
            expect(data).toStrictEqual(['十二', '負零點零四', '五億三千兩百萬四千三百一十二點一']);
        });
    });
});

describe('negative or positive chinese characters', () => {
    const get_negative_or_positive_number = require('./translate-methods').get_negative_or_positive_number;
    test('simplified negative number', () => {
        expect(get_negative_or_positive_number(true, 'sc', '两千三百一十六')).toStrictEqual('负两千三百一十六')
    });
    test('traditional negative number', () => {
        expect(get_negative_or_positive_number(true, 'tc', '兩千三百一十六')).toStrictEqual('負兩千三百一十六')
    });
    test('simplified positive number', () => {
        expect(get_negative_or_positive_number(false, 'sc', '两千三百一十六')).toStrictEqual('两千三百一十六')
    });
    test('traditional positive number', () => {
        expect(get_negative_or_positive_number(false, 'tc', '兩千三百一十六')).toStrictEqual('兩千三百一十六')
    });
});

// TODO:: change url to actual url
describe('chinese characters to audio tests with post request inside', () => {
    const translate_numbers_to_chinese_audio = require('./translate-methods').translate_numbers_to_chinese_audio;
    const nock = require('nock');
    const url = process.env.URL;
    const post_url = '/chinese-numbers-to-audio'
    afterAll(() => {
        nock.cleanAll();
    })
    test('should retrieve successful request', () => {
        const scope = nock(url)
            .post(post_url)
            .reply(200, {
                chinese_audio: 'success'
            });
            return translate_numbers_to_chinese_audio(['test']).then(data => {
                expect(data).toStrictEqual('success');
            });
    })
    test('should retrieve failure request', () =>{
        const scope = nock(url)
            .post(post_url)
            .reply(400, {
                status: 400,
                message: "failed"
            });
            return translate_numbers_to_chinese_audio(['test']).catch(data => {
                expect(data['message']).toStrictEqual('failed');
            });
    })
    test('should retrieve failure request from Internal Server issue', () =>{
        const scope = nock(url)
            .post(post_url)
            .reply(500, {
                status: 500,
                message: "Internal Server Error"
            });
            return translate_numbers_to_chinese_audio(['test']).catch(data => {
                expect(data['message']).toStrictEqual('Internal Server Error');
            });
    })
});

describe('get_q_and_a and wrapper function tests', () => {
    const translate_methods = require('./translate-methods');
    test('throw error from invalid chinese character type ("sc" or "tc")', async () => {
        await expect(translate_methods.get_q_and_a([{number: '1234', question_type: 'readNumber', answer_type: 'writeCharacter'}],"", jest.fn(), jest.fn()))
        .rejects
        .toThrowError(new Error("Invalid parameter use either \"sc\" for simplified chinese or \"tc\" for traditional chinese"));

        await expect(translate_methods.get_q_and_a([{number: '1234', question_type: 'readNumber', answer_type: 'writeCharacter'}], null, jest.fn(), jest.fn()))
        .rejects
        .toThrowError(new Error("Invalid parameter use either \"sc\" for simplified chinese or \"tc\" for traditional chinese"));

        await expect(translate_methods.get_q_and_a([{number: '1234', question_type: 'readNumber', answer_type: 'writeCharacter'}], "cc", jest.fn(), jest.fn()))
        .rejects
        .toThrowError(new Error("Invalid parameter use either \"sc\" for simplified chinese or \"tc\" for traditional chinese"));
    });
    test('throw error for to_translate_numbers not being a list', async () => {
        await expect(translate_methods.get_q_and_a({number: '1234', question_type: 'readNumber', answer_type: 'writeCharacter'}, "sc", jest.fn(), jest.fn()))
        .rejects
        .toThrow('to_translate_numbers was not a list');
    });
    test('throw error from inner methods', async () => {
        const mock_1_num_to_chn_char = jest
            .fn()
            .mockImplementationOnce(() => Promise.reject(new Error('Parameter for number is not a valid number')));
        await expect(translate_methods.get_q_and_a([
            {number: '12', question_type: 'readCharacter', answer_type: 'writeNumber'},
            {number: 'f', question_type: 'readCharacter', answer_type: 'writeNumber'}
        ], 'sc', mock_1_num_to_chn_char, jest.fn() 
        ))
        .rejects
        .toThrow('Parameter for number is not a valid number');

        const mock_2_num_to_chn_char = jest
            .fn()
            .mockImplementationOnce(() => Promise.resolve([]))       
            .mockImplementationOnce(() => Promise.reject(new Error('Parameter for number is not a valid number')));       
        await expect(translate_methods.get_q_and_a([
            {number: '12', question_type: 'readCharacter', answer_type: 'writeNumber'},
            {number: 'f', question_type: 'readCharacter', answer_type: 'writeNumber'}
        ], 'sc', mock_2_num_to_chn_char, jest.fn() 
        ))
        .rejects
        .toThrow('Parameter for number is not a valid number');       

        const mock_3_num_to_chn_char = jest
            .fn()
            .mockImplementation(() => Promise.resolve([]))
        const mock_3_chn_char_to_audio = jest
            .fn()
            .mockImplementationOnce(() => Promise.reject(new Error({status: 400, message: 'some error'})))
        await expect(translate_methods.get_q_and_a([
            {number: '12', question_type: 'readCharacter', answer_type: 'writeNumber'},
            {number: 'f', question_type: 'readCharacter', answer_type: 'writeNumber'}
        ], 'sc', mock_3_num_to_chn_char, mock_3_chn_char_to_audio 
        ))
        .rejects
        .toThrow(new Error({status: 400, message: 'some error'}));       

        const mock_4_num_to_chn_char = jest
            .fn()
            .mockImplementationOnce(() => Promise.resolve([]))    
            .mockImplementationOnce(() => Promise.resolve([]))    
            .mockImplementationOnce(() => Promise.reject(new Error('Parameter for number is not a valid number')))    
         await expect(translate_methods.get_q_and_a([
            {number: '12', question_type: 'readCharacter', answer_type: 'writeNumber'},
            {number: 'f', question_type: 'readCharacter', answer_type: 'writeNumber'}
        ], 'sc', mock_4_num_to_chn_char, jest.fn() 
        ))
        .rejects
        .toThrow('Parameter for number is not a valid number');       

        const mock_5_num_to_chn_char = jest
            .fn()
            .mockImplementation(() => Promise.resolve([]))
        const mock_5_chn_char_to_audio = jest
            .fn()
            .mockImplementationOnce(() => Promise.resolve([]))
            .mockImplementationOnce(() => Promise.reject(new Error({status: 400, message: 'some error'})));
        await expect(translate_methods.get_q_and_a([
            {number: '12', question_type: 'readCharacter', answer_type: 'writeNumber'},
            {number: 'f', question_type: 'readCharacter', answer_type: 'writeNumber'}
        ], 'sc', mock_5_num_to_chn_char, mock_5_chn_char_to_audio 
        ))
        .rejects
        .toThrow(new Error({status: 400, message: 'some error'}));       
    });
    test('only one number, read number, write character', async () => {
        const mock_prom_tran_num_to_chars = jest
            .fn()
            .mockImplementationOnce(() => Promise.resolve(['一']))
            .mockImplementation(() => Promise.resolve([]))
        const mock_num_to_chn_audio = jest
            .fn()
            .mockImplementation(() => Promise.resolve([]))
        expect.assertions(1);
        const data = await translate_methods.get_q_and_a([{number: '1', question_type: 'readNumber', answer_type: 'writeCharacter'}], 'sc', mock_prom_tran_num_to_chars, mock_num_to_chn_audio);
        expect(data).toStrictEqual([{listen: null, question: '1', answer: '一', answer_type: 'writeCharacter'}])
    });
    test('only one number, q:read character, a:write number', async() => {
        const mock_prom_tran_num_to_chars = jest
            .fn()
            .mockImplementationOnce(() => Promise.resolve(['二']))
            .mockImplementation(() => Promise.resolve([]))
         const mock_num_to_chn_audio = jest
            .fn()
            .mockImplementation(() => Promise.resolve([]))       
            expect.assertions(1);
            const data = await translate_methods.get_q_and_a([{number: '2', question_type: 'readCharacter', answer_type: 'writeNumber'}], 'sc', mock_prom_tran_num_to_chars, mock_num_to_chn_audio);
            expect(data).toStrictEqual([{listen: null, question: '二', answer: '2', answer_type: 'writeNumber'}])   
    });
    test('only one number, q:listen, a:write number and write character', async() => {
        const mock_prom_tran_num_to_chars = jest
            .fn()
            .mockImplementationOnce(() => Promise.resolve([]))
            .mockImplementationOnce(() => Promise.resolve([]))
            .mockImplementationOnce(() => Promise.resolve([]))
            .mockImplementation(() => Promise.resolve(['二']))
        const mock_num_to_chn_audio = jest
            .fn()
            .mockImplementationOnce((arg1) => Promise.resolve(['audio test for 12']))       
            .mockImplementationOnce(() => Promise.resolve())
            .mockImplementationOnce(() => Promise.resolve())
            .mockImplementationOnce((arg1) => Promise.resolve(['audio test for 12']))       
            .mockImplementation(() => Promise.resolve())
        expect.assertions(2);
        const listen_number_data = await translate_methods.get_q_and_a([{number: '2', question_type: 'listen', answer_type: 'writeNumber'}], 'sc', mock_prom_tran_num_to_chars, mock_num_to_chn_audio);
        // test listen and write number
        expect(listen_number_data).toStrictEqual(
            [
                {listen: 'audio test for 12', question: null, answer: '2', answer_type: 'writeNumber'}
            ])
        const listen_char_data = await translate_methods.get_q_and_a([{number: '2', question_type: 'listen', answer_type: 'writeCharacter'}], 'sc', mock_prom_tran_num_to_chars, mock_num_to_chn_audio);
        // test listen and write character 
        expect(listen_char_data).toStrictEqual(
            [
                {listen: 'audio test for 12', question: null, answer: '二', answer_type: 'writeCharacter'}
            ])
        });
    test('two numbers no listen', async() => {
        expect.assertions(3);
        const mock_tran_num_to_char = () => 
            jest.fn()
            .mockImplementationOnce(() => Promise.resolve(['二十一', '九']))
            .mockImplementation(() => Promise.resolve([]));
        const mock_audio_no_audio = () =>
            jest.fn()
            .mockImplementation(() => Promise.resolve([]));

        // both answer types writeCharacter
        const data = await translate_methods.get_q_and_a(
            [
                {number: '21', question_type: 'readNumber', answer_type: 'writeCharacter'}, 
                {number: '9', question_type: 'readNumber', answer_type: 'writeCharacter'}
            ], 
            'sc', 
            mock_tran_num_to_char(), 
            mock_audio_no_audio()
        );
        expect(data).toStrictEqual(
            [
                {listen: null, question: '21', answer: '二十一', answer_type: 'writeCharacter'},
                {listen: null, question: '9', answer: '九', answer_type: 'writeCharacter'},

            ]);

        // mixed answer types
        const dataOne = await translate_methods.get_q_and_a(
            [
                {number: '21', question_type: 'readCharacter', answer_type: 'writeNumber'}, 
                {number: '9', question_type: 'readNumber', answer_type: 'writeCharacter'}
            ], 
            'sc', 
            mock_tran_num_to_char(), 
            mock_audio_no_audio()
        );
        expect(dataOne).toStrictEqual(
            [
                {listen: null, question: '二十一', answer: '21', answer_type: 'writeNumber'},
                {listen: null, question: '9', answer: '九', answer_type: 'writeCharacter'},

            ]);

        // both answer types writeCharacter 
        const dataTwo = await translate_methods.get_q_and_a(
            [
                {number: '21', question_type: 'readCharacter', answer_type: 'writeNumber'}, 
                {number: '9', question_type: 'readCharacter', answer_type: 'writeNumber'}
            ], 
            'sc', 
            mock_tran_num_to_char(), 
            mock_audio_no_audio()
        );
        expect(dataTwo).toStrictEqual(
            [
                {listen: null, question: '二十一', answer: '21', answer_type: 'writeNumber'},
                {listen: null, question: '九', answer: '9', answer_type: 'writeNumber'},

            ]);
    });
    test('two number readNumber, listen, writeCharacter answer type', async() => {
        expect.assertions(1)
        const mock_num_to_chn_char_read_num_listen = () =>
            jest.fn()
            .mockImplementationOnce(() => Promise.resolve(['三十四']))
            .mockImplementationOnce(() => Promise.resolve([]))
            .mockImplementationOnce(() => Promise.resolve(['九十九']))
        const mock_audio_write_char = () =>
            jest.fn()
            .mockImplementationOnce(() => Promise.resolve([]))
            .mockImplementationOnce(() => Promise.resolve(['num audio']))
        const data_read_num_listen_write_char = await translate_methods.get_q_and_a(
            [
                {number: '34', question_type: 'readNumber', answer_type: 'writeCharacter'},
                {number: '99', question_type: 'listen', answer_type: 'writeCharacter'}
            ],
            'tc',
            mock_num_to_chn_char_read_num_listen(),
            mock_audio_write_char()
        );
        expect(data_read_num_listen_write_char).toStrictEqual(
            [
                {listen: null, question: '34', answer: '三十四', answer_type: 'writeCharacter'},
                {listen: 'num audio', question: null, answer: '九十九', answer_type: 'writeCharacter'}
            ]
        )
    })
    test('two numbers readNumber and listen, both answer types', async() => {
        expect.assertions(1);
        const mock_num_to_chn_char_both_write_char_write_num = () => 
            jest.fn()
            .mockImplementationOnce(() => Promise.resolve(['负三十四', '负九十九']))
            .mockImplementation(() => Promise.resolve([]))
        const mock_audio_write_number = () => 
            jest.fn()
            .mockImplementationOnce(() => Promise.resolve(['num audio']))
            .mockImplementation(() => Promise.resolve([]))

        const data_read_num_listen_write_num = await translate_methods.get_q_and_a(
            [
                {number: '-34', question_type: 'readNumber', answer_type: 'writeCharacter'},
                {number: '-99', question_type: 'listen', answer_type: 'writeNumber'}
            ],
            'sc',
            mock_num_to_chn_char_both_write_char_write_num(),
            mock_audio_write_number()
        )
        expect(data_read_num_listen_write_num).toStrictEqual(
            [
                {listen: null, question: '-34', answer: '负三十四', answer_type: 'writeCharacter'},
                {listen: 'num audio', question: null, answer: '-99', answer_type: 'writeNumber'}
            ]
        )
    })
    test('two numbers readCharacter and listen', async() => {
        expect.assertions(2)
        const mock_num_to_chn_char_write_number = () => 
            jest.fn()
            .mockImplementationOnce(() => Promise.resolve(['三十四点六', '九十九']))
            .mockImplementation(() => Promise.resolve([]))
        const mock_audio_write_number = () => 
            jest.fn()
            .mockImplementationOnce(() => Promise.resolve(['num audio']))
            .mockImplementation(() => Promise.resolve([]))
        const data_read_char_listen_write_num = await translate_methods.get_q_and_a(
            [
                {number: '34.6', question_type: 'readCharacter', answer_type: 'writeNumber'},
                {number: '99', question_type: 'listen', answer_type: 'writeNumber'}
            ],
            'tc',
            mock_num_to_chn_char_write_number(),
            mock_audio_write_number()
        )
        expect(data_read_char_listen_write_num).toStrictEqual(
            [
                {listen: null, question: '三十四点六', answer: '34.6', answer_type: 'writeNumber'},
                {listen: 'num audio', question: null, answer: '99', answer_type: 'writeNumber'}
            ]
        )

        const mock_num_to_chn_char_write_number_write_character = () =>
            jest.fn()
            .mockImplementationOnce(() => Promise.resolve(['七千零六']))
            .mockImplementationOnce(() => Promise.resolve([]))
            .mockImplementationOnce(() => Promise.resolve(['四亿']))
        const mock_audio_write_character = () =>
            jest.fn()
            .mockImplementationOnce(() => Promise.resolve([]))
            .mockImplementationOnce(() => Promise.resolve(['write character audio']))
        const data_read_char_listen_write_char = await translate_methods.get_q_and_a(
            [
                {number: '7006', question_type: 'readCharacter', answer_type: 'writeNumber'},
                {number: '4000', question_type: 'listen', answer_type: 'writeCharacter'}
            ],
            'tc',
            mock_num_to_chn_char_write_number_write_character(),
            mock_audio_write_character()
        )
        expect(data_read_char_listen_write_char).toStrictEqual(
            [
                {listen: null, question: '七千零六', answer: '7006', answer_type: 'writeNumber'},
                {listen: 'write character audio', question: null, answer: '四亿', answer_type: 'writeCharacter'}
            ]
        )
    })
    test('two numbers both listen', async() => {
        expect.assertions(3)

        const num_to_chn_char_both_write_number = () => 
            jest.fn()
            .mockImplementationOnce(() => Promise.resolve(['五千三百一十', '五千三百一十六']))
            .mockImplementation(() => Promise.resolve([]));
        const audio_write_char_both_write_number = () =>
            jest.fn()
            .mockImplementationOnce(() => Promise.resolve(['audio 1', 'audio 2']))
            .mockImplementationOnce(() => Promise.resolve([]))
        
        const data_both_write_numbers = await translate_methods.get_q_and_a(
            [
                {number: '5310', question_type: 'listen', answer_type: 'writeNumber'},
                {number: '5316', question_type: 'listen', answer_type: 'writeNumber'}
            ],
            'sc',
            num_to_chn_char_both_write_number(),
            audio_write_char_both_write_number()
        );
        expect(data_both_write_numbers).toStrictEqual(
            [
                
                {listen: 'audio 1', question: null, answer: '5310', answer_type: 'writeNumber'},
                {listen: 'audio 2', question: null, answer: '5316', answer_type: 'writeNumber'}
            ]
        );
        
        const num_to_chn_char_mixed_answers = () => 
            jest.fn()
            .mockImplementationOnce(() => Promise.resolve(['五千三百一十']))
            .mockImplementation(() => Promise.resolve(['五千三百一十六']));
        const audio_write_char_both_mixed_answers = () =>
            jest.fn()
            .mockImplementationOnce(() => Promise.resolve(['audio 1']))
            .mockImplementationOnce(() => Promise.resolve(['audio 2']))
        
        const data_mixed_answers = await translate_methods.get_q_and_a(
            [
                {number: '5310', question_type: 'listen', answer_type: 'writeNumber'},
                {number: '5316', question_type: 'listen', answer_type: 'writeCharacter'}
            ],
            'sc',
            num_to_chn_char_mixed_answers(),
            audio_write_char_both_mixed_answers()
        );
        expect(data_mixed_answers).toStrictEqual(
            [
                
                {listen: 'audio 1', question: null, answer: '5310', answer_type: 'writeNumber'},
                {listen: 'audio 2', question: null, answer: '五千三百一十六', answer_type: 'writeCharacter'}
            ]
        );

         const num_to_chn_char_both_and_write_character = () => 
            jest.fn()
            .mockImplementationOnce(() => Promise.resolve([]))
            .mockImplementationOnce(() => Promise.resolve([]))
            .mockImplementationOnce(() => Promise.resolve(['五千三百一十', '五千三百一十六']))


        const audio_write_char_both_write_character = () =>
            jest.fn()
            .mockImplementationOnce(() => Promise.resolve([]))
            .mockImplementationOnce(() => Promise.resolve(['audio 1', 'audio 2']))

        const data_both_write_characters = await translate_methods.get_q_and_a(
            [
                {number: '5310', question_type: 'listen', answer_type: 'writeCharacter'},
                {number: '5316', question_type: 'listen', answer_type: 'writeCharacter'}
            ],
            'sc',
            num_to_chn_char_both_and_write_character(),
            audio_write_char_both_write_character()
        )
        expect(data_both_write_characters).toStrictEqual(
            [
                
                {listen: 'audio 1', question: null, answer: '五千三百一十', answer_type: 'writeCharacter'},
                {listen: 'audio 2', question: null, answer: '五千三百一十六', answer_type: 'writeCharacter'}
            ]
        )
    })
    // TODO:: fill this test
    test('three numbers, each question type', async () => {
        /* 1) read Number, write Character 
         * 2) read Character, write Number 
         * 3) listen, write Number
         */
        expect.assertions(2);
        const mock_1_num_to_chn_char = () =>
            jest.fn()
            .mockImplementationOnce(() => Promise.resolve(['負七萬四千九百九十四', '五千三百一十六']))
            .mockImplementation(() => Promise.resolve([]))
        const mock_1_chn_char_to_audio = () =>
            jest.fn()
            .mockImplementationOnce(() => Promise.resolve(['third number audio']))
            .mockImplementation(() => Promise.resolve([]))
        const data_mock_one = await translate_methods.get_q_and_a(
            [
                {number: '-74994', question_type: 'readNumber', answer_type: 'writeCharacter'},
                {number: '5316', question_type: 'readCharacter', answer_type: 'writeNumber'},
                {number: '123.45', question_type: 'listen', answer_type: 'writeNumber'}
            ],
            'tc',
            mock_1_num_to_chn_char(),
            mock_1_chn_char_to_audio()
        );
        expect(data_mock_one).toStrictEqual(
            [
                {listen: null, question: '-74994', answer: '負七萬四千九百九十四', answer_type: 'writeCharacter'},
                {listen: null, question: '五千三百一十六', answer: '5316', answer_type: 'writeNumber'},
                {listen: 'third number audio', question: null, answer: '123.45', answer_type: 'writeNumber'},

            ]
        )
        /* 1) read Number, write Number
         * 2) read Character, write Character
         * 3) listen, write Character 
         */
        const mock_2_num_to_chn_char = () =>
            jest.fn()
            .mockImplementationOnce(() => Promise.resolve(['负七万四千九百九十四', '五千三百一十六']))
            .mockImplementationOnce(() => Promise.resolve([]))
            .mockImplementationOnce(() => Promise.resolve(['一百二十三点四五']));
        const mock_2_chn_char_to_audio = () =>
            jest.fn()
            .mockImplementationOnce(() => Promise.resolve([]))
            .mockImplementationOnce(() => Promise.resolve(['third number audio']))
        const data_mock_two = await translate_methods.get_q_and_a(
            [
                {number: '-74994', question_type: 'readNumber', answer_type: 'writeCharacter'},
                {number: '5316', question_type: 'readCharacter', answer_type: 'writeNumber'},
                {number: '123.45', question_type: 'listen', answer_type: 'writeCharacter'}
            ],
            'sc',
            mock_2_num_to_chn_char(),
            mock_2_chn_char_to_audio()
        );
        expect(data_mock_two).toStrictEqual(
            [
                {listen: null, question: '-74994', answer: '负七万四千九百九十四', answer_type: 'writeCharacter'},
                {listen: null, question: '五千三百一十六', answer: '5316', answer_type: 'writeNumber'},
                {listen: 'third number audio', question: null, answer: '一百二十三点四五', answer_type: 'writeCharacter'},

            ]
        );
    });
    // TODO:: write test for multiple numbers for each answer and question type
    test('multiple question types', async () => {
        expect.assertions(1);
        const mock_num_to_chn_char = () =>
            jest.fn()
            .mockImplementationOnce(() => Promise.resolve(
                [
                    '两兆三千四百五十六亿七千七百九十八万五千零九十', 
                    '负三亿零四十三万两千九百八十七', 
                    '负九十四万三千两百零二点四', 
                    '八万四千五百四十二点零一',
                    '两千一白五十七'
                ]
            ))
            .mockImplementationOnce(() => Promise.resolve([]))
            .mockImplementationOnce(() => Promise.resolve(['零点八五']))
        const mock_chn_char_to_audio = () =>
            jest.fn()
            .mockImplementationOnce(() => Promise.resolve(['audio 1', 'audio 3']))
            .mockImplementationOnce(() => Promise.resolve(['audio 2']))
        const data = await translate_methods.get_q_and_a(
            [
                {number: '2345677985090', question_type: 'readNumber', answer_type: 'writeCharacter'},
                {number: '-300432987', question_type: 'readNumber', answer_type: 'writeCharacter'},
                {number: '-943202.4', question_type: 'readCharacter', answer_type: 'writeNumber'},
                {number: '84542.01', question_type: 'readCharacter', answer_type: 'writeNumber'},
                {number: '2157', question_type: 'readCharacter', answer_type: 'writeNumber'},
                {number: '-32001', question_type: 'listen', answer_type: 'writeNumber'},
                {number: '0.85', question_type: 'listen', answer_type: 'writeCharacter'},
                {number: '-14.5', question_type: 'listen', answer_type: 'writeNumber'}
            ],
            'sc',
            mock_num_to_chn_char(),
            mock_chn_char_to_audio()
        );
        expect(data).toStrictEqual(
            [
                {listen: null, question: '2345677985090', answer: '两兆三千四百五十六亿七千七百九十八万五千零九十', answer_type: 'writeCharacter'},
                {listen: null, question: '-300432987', answer: '负三亿零四十三万两千九百八十七', answer_type: 'writeCharacter'},
                {listen: null, question: '负九十四万三千两百零二点四', answer: '-943202.4', answer_type: 'writeNumber'},
                {listen: null, question: '八万四千五百四十二点零一', answer: '84542.01', answer_type: 'writeNumber'},
                {listen: null, question: '两千一白五十七', answer: '2157', answer_type: 'writeNumber'},
                {listen: 'audio 1', question: null, answer: '-32001', answer_type: 'writeNumber'},
                {listen: 'audio 2', question: null, answer: '零点八五', answer_type: 'writeCharacter'},
                {listen: 'audio 3', question: null, answer: '-14.5', answer_type: 'writeNumber'},

            ]
        );
    });
})
