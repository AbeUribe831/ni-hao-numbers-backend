const num_to_chn_char = require('./translate-methods').conv_num_as_string_to_chn_char;

test('properly throws errors at invalid inputs', () => {

});
//TODO:: add test to check the number is in valid range and that it is a number
test('properly translates numbers ones [-9,9] in both simplified and traditional chinese', () => {
    expect(num_to_chn_char("sc", "-1")).toBe("负一");
    expect(num_to_chn_char("sc", "-2")).toBe("负二");
    expect(num_to_chn_char("sc", "-3")).toBe("负三");
    expect(num_to_chn_char("sc", "-4")).toBe("负四");
    expect(num_to_chn_char("sc", "-5")).toBe("负五");
    expect(num_to_chn_char("sc", "-6")).toBe("负六");
    expect(num_to_chn_char("sc", "-7")).toBe("负七");
    expect(num_to_chn_char("sc", "-8")).toBe("负八");
    expect(num_to_chn_char("sc", "-9")).toBe("负九");
    
    expect(num_to_chn_char("sc", "0")).toBe("零");
    expect(num_to_chn_char("sc", "1")).toBe("一");
    expect(num_to_chn_char("sc", "2")).toBe("二");
    expect(num_to_chn_char("sc", "3")).toBe("三");
    expect(num_to_chn_char("sc", "4")).toBe("四");
    expect(num_to_chn_char("sc", "5")).toBe("五");
    expect(num_to_chn_char("sc", "6")).toBe("六");
    expect(num_to_chn_char("sc", "7")).toBe("七");
    expect(num_to_chn_char("sc", "8")).toBe("八");
    expect(num_to_chn_char("sc", "9")).toBe("九");
    
    // ---------------------- traditional chinese --------------------------//
    expect(num_to_chn_char("tc", "-1")).toBe("負一");
    expect(num_to_chn_char("tc", "-2")).toBe("負二");
    expect(num_to_chn_char("tc", "-3")).toBe("負三");
    expect(num_to_chn_char("tc", "-4")).toBe("負四");
    expect(num_to_chn_char("tc", "-5")).toBe("負五");
    expect(num_to_chn_char("tc", "-6")).toBe("負六");
    expect(num_to_chn_char("tc", "-7")).toBe("負七");
    expect(num_to_chn_char("tc", "-8")).toBe("負八");
    expect(num_to_chn_char("tc", "-9")).toBe("負九");
    
    expect(num_to_chn_char("tc", "0")).toBe("零")
    expect(num_to_chn_char("tc", "1")).toBe("一");
    expect(num_to_chn_char("tc", "2")).toBe("二");
    expect(num_to_chn_char("tc", "3")).toBe("三");
    expect(num_to_chn_char("tc", "4")).toBe("四");
    expect(num_to_chn_char("tc", "5")).toBe("五");
    expect(num_to_chn_char("tc", "6")).toBe("六");
    expect(num_to_chn_char("tc", "7")).toBe("七");
    expect(num_to_chn_char("tc", "8")).toBe("八");
    expect(num_to_chn_char("tc", "9")).toBe("九");
});

test('properly translates tens [-99, -10] U [10-99] in both simplified and traditional chinese', () => {
    expect(num_to_chn_char("sc", "-10")).toBe("负十");
    expect(num_to_chn_char("sc", "-11")).toBe("负十一");
    expect(num_to_chn_char("sc", "-12")).toBe("负十二");
    expect(num_to_chn_char("sc", "-15")).toBe("负十五");
    expect(num_to_chn_char("sc", "-19")).toBe("负十九");
    expect(num_to_chn_char("sc", "-20")).toBe("负二十");
    expect(num_to_chn_char("sc", "-22")).toBe("负二十二");
    expect(num_to_chn_char("sc", "-23")).toBe("负二十三");
    expect(num_to_chn_char("sc", "-28")).toBe("负二十八");
    expect(num_to_chn_char("sc", "-60")).toBe("负六十");
    expect(num_to_chn_char("sc", "-67")).toBe("负六十七");
    expect(num_to_chn_char("sc", "-90")).toBe("负九十");
    expect(num_to_chn_char("sc", "-99")).toBe("负九十九");

    expect(num_to_chn_char("sc", "10")).toBe("十");
    expect(num_to_chn_char("sc", "11")).toBe("十一");
    expect(num_to_chn_char("sc", "12")).toBe("十二");
    expect(num_to_chn_char("sc", "15")).toBe("十五");
    expect(num_to_chn_char("sc", "19")).toBe("十九");
    expect(num_to_chn_char("sc", "20")).toBe("二十");
    expect(num_to_chn_char("sc", "22")).toBe("二十二");
    expect(num_to_chn_char("sc", "23")).toBe("二十三");
    expect(num_to_chn_char("sc", "28")).toBe("二十八");
    expect(num_to_chn_char("sc", "60")).toBe("六十");
    expect(num_to_chn_char("sc", "67")).toBe("六十七");
    expect(num_to_chn_char("sc", "90")).toBe("九十");
    expect(num_to_chn_char("sc", "99")).toBe("九十九");
    // ---------------------- traditional chinese --------------------------//
    expect(num_to_chn_char("tc", "-10")).toBe("負十");
    expect(num_to_chn_char("tc", "-11")).toBe("負十一");
    expect(num_to_chn_char("tc", "-12")).toBe("負十二")
    expect(num_to_chn_char("tc", "-15")).toBe("負十五");
    expect(num_to_chn_char("tc", "-19")).toBe("負十九");
    expect(num_to_chn_char("tc", "-20")).toBe("負二十");
    expect(num_to_chn_char("tc", "-22")).toBe("負二十二");
    expect(num_to_chn_char("tc", "-24")).toBe("負二十四");
    expect(num_to_chn_char("tc", "-28")).toBe("負二十八");
    expect(num_to_chn_char("tc", "-60")).toBe("負六十");
    expect(num_to_chn_char("tc", "-67")).toBe("負六十七");
    expect(num_to_chn_char("tc", "-90")).toBe("負九十");
    expect(num_to_chn_char("tc", "-99")).toBe("負九十九");

    expect(num_to_chn_char("tc", "10")).toBe("十");
    expect(num_to_chn_char("tc", "11")).toBe("十一");
    expect(num_to_chn_char("tc", "12")).toBe("十二")
    expect(num_to_chn_char("tc", "15")).toBe("十五");
    expect(num_to_chn_char("tc", "19")).toBe("十九");
    expect(num_to_chn_char("tc", "20")).toBe("二十");
    expect(num_to_chn_char("tc", "22")).toBe("二十二");
    expect(num_to_chn_char("tc", "24")).toBe("二十四");
    expect(num_to_chn_char("tc", "28")).toBe("二十八");
    expect(num_to_chn_char("tc", "60")).toBe("六十");
    expect(num_to_chn_char("tc", "67")).toBe("六十七");
    expect(num_to_chn_char("tc", "90")).toBe("九十");
    expect(num_to_chn_char("tc", "99")).toBe("九十九");
});

test('properly translates hundreds [-999, 100] U [100, 999] in both simplified and traditional chinese', () => {
    expect(num_to_chn_char("sc", "-100")).toBe("负一百");
    expect(num_to_chn_char("sc", "-101")).toBe("负一百零一");
    expect(num_to_chn_char("sc", "-110")).toBe("负一百一十");
    expect(num_to_chn_char("sc", "-121")).toBe("负一百二十一");
    expect(num_to_chn_char("sc", "-155")).toBe("负一百五十五");
    expect(num_to_chn_char("sc", "-222")).toBe("负两百二十二");
    expect(num_to_chn_char("sc", "-317")).toBe("负三百一十七");
    expect(num_to_chn_char("sc", "-999")).toBe("负九百九十九");
    
    expect(num_to_chn_char("sc", "100")).toBe("一百");
    expect(num_to_chn_char("sc", "101")).toBe("一百零一");
    expect(num_to_chn_char("sc", "110")).toBe("一百一十");
    expect(num_to_chn_char("sc", "121")).toBe("一百二十一");
    expect(num_to_chn_char("sc", "155")).toBe("一百五十五");
    expect(num_to_chn_char("sc", "222")).toBe("两百二十二");
    expect(num_to_chn_char("sc", "317")).toBe("三百一十七");
    expect(num_to_chn_char("sc", "999")).toBe("九百九十九");

    // ---------------------- traditional chinese --------------------------//
    expect(num_to_chn_char("tc", "-100")).toBe("負一百");
    expect(num_to_chn_char("tc", "-101")).toBe("負一百零一");
    expect(num_to_chn_char("tc", "-110")).toBe("負一百一十");
    expect(num_to_chn_char("tc", "-121")).toBe("負一百二十一");
    expect(num_to_chn_char("tc", "-155")).toBe("負一百五十五");
    expect(num_to_chn_char("tc", "-222")).toBe("負兩百二十二");
    expect(num_to_chn_char("tc", "-317")).toBe("負三百一十七");
    expect(num_to_chn_char("tc", "-999")).toBe("負九百九十九");
   
    expect(num_to_chn_char("tc", "100")).toBe("一百");
    expect(num_to_chn_char("tc", "101")).toBe("一百零一");
    expect(num_to_chn_char("tc", "110")).toBe("一百一十");
    expect(num_to_chn_char("tc", "121")).toBe("一百二十一");
    expect(num_to_chn_char("tc", "155")).toBe("一百五十五");
    expect(num_to_chn_char("tc", "222")).toBe("兩百二十二");
    expect(num_to_chn_char("tc", "317")).toBe("三百一十七");
    expect(num_to_chn_char("tc", "999")).toBe("九百九十九");

});

test('properly translate thousands [-9999, -1000] U [1000, 9999] in both simplified and traditional chinese', () => {
    expect(num_to_chn_char("sc", "-1000")).toBe("负一千");
    expect(num_to_chn_char("sc", "-1004")).toBe("负一千零四");
    expect(num_to_chn_char("sc", "-2090")).toBe("负两千零九十");
    expect(num_to_chn_char("sc", "-2222")).toBe("负两千两百二十二");
    expect(num_to_chn_char("sc", "-3075")).toBe("负三千零七十五");
    expect(num_to_chn_char("sc", "-4200")).toBe("负四千两百");
    expect(num_to_chn_char("sc", "-5102")).toBe("负五千一百零二");
    expect(num_to_chn_char("sc", "-6320")).toBe("负六千三百二十");
    expect(num_to_chn_char("sc", "-7438")).toBe("负七千四百三十八");
    expect(num_to_chn_char("sc", "-9999")).toBe("负九千九百九十九");
    
    expect(num_to_chn_char("sc", "1000")).toBe("一千");
    expect(num_to_chn_char("sc", "1004")).toBe("一千零四");
    expect(num_to_chn_char("sc", "2090")).toBe("两千零九十");
    expect(num_to_chn_char("sc", "2222")).toBe("两千两百二十二");
    expect(num_to_chn_char("sc", "3075")).toBe("三千零七十五");
    expect(num_to_chn_char("sc", "4200")).toBe("四千两百");
    expect(num_to_chn_char("sc", "5102")).toBe("五千一百零二");
    expect(num_to_chn_char("sc", "6320")).toBe("六千三百二十");
    expect(num_to_chn_char("sc", "7438")).toBe("七千四百三十八");
    expect(num_to_chn_char("sc", "9999")).toBe("九千九百九十九");


    // ---------------------- traditional chinese --------------------------//
    expect(num_to_chn_char("tc", "-1000")).toBe("負一千");
    expect(num_to_chn_char("tc", "-1004")).toBe("負一千零四");
    expect(num_to_chn_char("tc", "-2090")).toBe("負兩千零九十");
    expect(num_to_chn_char("tc", "-2222")).toBe("負兩千兩百二十二");
    expect(num_to_chn_char("tc", "-3075")).toBe("負三千零七十五");
    expect(num_to_chn_char("tc", "-4200")).toBe("負四千兩百");
    expect(num_to_chn_char("tc", "-5102")).toBe("負五千一百零二");
    expect(num_to_chn_char("tc", "-6320")).toBe("負六千三百二十");
    expect(num_to_chn_char("tc", "-7438")).toBe("負七千四百三十八");
    expect(num_to_chn_char("tc", "-9999")).toBe("負九千九百九十九");
    
    expect(num_to_chn_char("tc", "1000")).toBe("一千");
    expect(num_to_chn_char("tc", "1004")).toBe("一千零四");
    expect(num_to_chn_char("tc", "2090")).toBe("兩千零九十");
    expect(num_to_chn_char("tc", "2222")).toBe("兩千兩百二十二");
    expect(num_to_chn_char("tc", "3075")).toBe("三千零七十五");
    expect(num_to_chn_char("tc", "4200")).toBe("四千兩百");
    expect(num_to_chn_char("tc", "5102")).toBe("五千一百零二");
    expect(num_to_chn_char("tc", "6320")).toBe("六千三百二十");
    expect(num_to_chn_char("tc", "7438")).toBe("七千四百三十八");
    expect(num_to_chn_char("tc", "9999")).toBe("九千九百九十九");
});

test('properly translate ten thousands [-99,999,999 , -10,000] U [10,000 , 99,999,999] in both simplified and traditional chinese', () => {
    // ten-thousand case
    expect(num_to_chn_char("sc", "-10000")).toBe("负一万");
    expect(num_to_chn_char("sc", "-70000")).toBe("负七万");
    expect(num_to_chn_char("sc", "-80003")).toBe("负八万零三");
    expect(num_to_chn_char("sc", "-90021")).toBe("负九万零二十一");
    expect(num_to_chn_char("sc", "-60100")).toBe("负六万零一百");
    expect(num_to_chn_char("sc", "-50203")).toBe("负五万零两百零三");
    expect(num_to_chn_char("sc", "-40125")).toBe("负四万零一百二十五");
    expect(num_to_chn_char("sc", "-33000")).toBe("负三万三千");
    expect(num_to_chn_char("sc", "-21004")).toBe("负两万一千零四");
    expect(num_to_chn_char("sc", "-17080")).toBe("负一万七千零八十");
    expect(num_to_chn_char("sc", "-88091")).toBe("负八万八千零九十一");
    expect(num_to_chn_char("sc", "-79100")).toBe("负七万九千一百");
    expect(num_to_chn_char("sc", "-68202")).toBe("负六万八千两百零二");
    expect(num_to_chn_char("sc", "-52411")).toBe("负五万两千四百一十一");
    expect(num_to_chn_char("sc", "-43320")).toBe("负四万三千三百二十");
    expect(num_to_chn_char("sc", "-99999")).toBe("负九万九千九百九十九");
    
    // ten ten-thousands case (one hundred thousand)
    expect(num_to_chn_char("sc", "-100000")).toBe("负十万");
    expect(num_to_chn_char("sc", "-200000")).toBe("负二十万");
    expect(num_to_chn_char("sc", "-315221")).toBe("负三十一万五千两百二十一");
    expect(num_to_chn_char("sc", "-420778")).toBe("负四十二万零七百七十八");
    // hundred ten-thousand case (one million)
    expect(num_to_chn_char("sc", "-2222478")).toBe("负两百二十二万两千四百七十八");
    expect(num_to_chn_char("sc", "-3007019")).toBe("负三百万七千零一十九");
    expect(num_to_chn_char("sc", "-3017019")).toBe("负三百零一万七千零一十九");
    // thousand ten-million case (ten million)
    expect(num_to_chn_char("sc", "-70002381")).toBe("负七千万两千三百八十一");
    expect(num_to_chn_char("sc", "-81235416")).toBe("负八千一百二十三万五千四百一十六");
    expect(num_to_chn_char("sc", "-90667110")).toBe("负九千零六十六万七千一百一十");


    expect(num_to_chn_char("sc", "10000")).toBe("一万");
    expect(num_to_chn_char("sc", "70000")).toBe("七万");
    expect(num_to_chn_char("sc", "80003")).toBe("八万零三");
    expect(num_to_chn_char("sc", "90021")).toBe("九万零二十一");
    expect(num_to_chn_char("sc", "60100")).toBe("六万零一百");
    expect(num_to_chn_char("sc", "50203")).toBe("五万零两百零三");
    expect(num_to_chn_char("sc", "40125")).toBe("四万零一百二十五");
    expect(num_to_chn_char("sc", "33000")).toBe("三万三千");
    expect(num_to_chn_char("sc", "21004")).toBe("两万一千零四");
    expect(num_to_chn_char("sc", "17080")).toBe("一万七千零八十");
    expect(num_to_chn_char("sc", "88091")).toBe("八万八千零九十一");
    expect(num_to_chn_char("sc", "79100")).toBe("七万九千一百");
    expect(num_to_chn_char("sc", "68202")).toBe("六万八千两百零二");
    expect(num_to_chn_char("sc", "52411")).toBe("五万两千四百一十一");
    expect(num_to_chn_char("sc", "43320")).toBe("四万三千三百二十");
    expect(num_to_chn_char("sc", "99999")).toBe("九万九千九百九十九");

    // ten ten-thousands case (one hundred thousand)
    expect(num_to_chn_char("sc", "100000")).toBe("十万");
    expect(num_to_chn_char("sc", "200000")).toBe("二十万");
    expect(num_to_chn_char("sc", "315221")).toBe("三十一万五千两百二十一");
    expect(num_to_chn_char("sc", "420778")).toBe("四十二万零七百七十八");
    // hundred ten-thousand case (one million)
    expect(num_to_chn_char("sc", "2222478")).toBe("两百二十二万两千四百七十八");
    expect(num_to_chn_char("sc", "3007019")).toBe("三百万七千零一十九");
    expect(num_to_chn_char("sc", "3017019")).toBe("三百零一万七千零一十九");
    // thousand ten-million case (ten million)
    expect(num_to_chn_char("sc", "70002381")).toBe("七千万两千三百八十一");
    expect(num_to_chn_char("sc", "81235416")).toBe("八千一百二十三万五千四百一十六");
    expect(num_to_chn_char("sc", "90667110")).toBe("九千零六十六万七千一百一十");
    
    // ---------------------- traditional chinese --------------------------//
    expect(num_to_chn_char("tc", "-10000")).toBe("負一萬");
    expect(num_to_chn_char("tc", "-70000")).toBe("負七萬");
    expect(num_to_chn_char("tc", "-80003")).toBe("負八萬零三");
    expect(num_to_chn_char("tc", "-90021")).toBe("負九萬零二十一");
    expect(num_to_chn_char("tc", "-60100")).toBe("負六萬零一百");
    expect(num_to_chn_char("tc", "-50203")).toBe("負五萬零兩百零三");
    expect(num_to_chn_char("tc", "-40125")).toBe("負四萬零一百二十五");
    expect(num_to_chn_char("tc", "-33000")).toBe("負三萬三千");
    expect(num_to_chn_char("tc", "-21004")).toBe("負兩萬一千零四");
    expect(num_to_chn_char("tc", "-17080")).toBe("負一萬七千零八十");
    expect(num_to_chn_char("tc", "-88091")).toBe("負八萬八千零九十一");
    expect(num_to_chn_char("tc", "-79100")).toBe("負七萬九千一百");
    expect(num_to_chn_char("tc", "-68202")).toBe("負六萬八千兩百零二");
    expect(num_to_chn_char("tc", "-52411")).toBe("負五萬兩千四百一十一");
    expect(num_to_chn_char("tc", "-43320")).toBe("負四萬三千三百二十");
    expect(num_to_chn_char("tc", "-99999")).toBe("負九萬九千九百九十九");

    // ten ten-thousands case (one hundred thousand)
    expect(num_to_chn_char("tc", "-100000")).toBe("負十萬");
    expect(num_to_chn_char("tc", "-200000")).toBe("負二十萬");
    expect(num_to_chn_char("tc", "-315221")).toBe("負三十一萬五千兩百二十一");
    expect(num_to_chn_char("tc", "-420778")).toBe("負四十二萬零七百七十八");
    // hundred ten-thousand case (one million)
    expect(num_to_chn_char("tc", "-2222478")).toBe("負兩百二十二萬兩千四百七十八");
    expect(num_to_chn_char("tc", "-3007019")).toBe("負三百萬七千零一十九");
    expect(num_to_chn_char("tc", "-3017019")).toBe("負三百零一萬七千零一十九");
    // thousand ten-million case (ten million)
    expect(num_to_chn_char("tc", "-70002381")).toBe("負七千萬兩千三百八十一");
    expect(num_to_chn_char("tc", "-81235416")).toBe("負八千一百二十三萬五千四百一十六");
    expect(num_to_chn_char("tc", "-90667110")).toBe("負九千零六十六萬七千一百一十");
    expect(num_to_chn_char("tc", "-99999999")).toBe("負九千九百九十九萬九千九百九十九");

    expect(num_to_chn_char("tc", "10000")).toBe("一萬");
    expect(num_to_chn_char("tc", "70000")).toBe("七萬");
    expect(num_to_chn_char("tc", "80003")).toBe("八萬零三");
    expect(num_to_chn_char("tc", "90021")).toBe("九萬零二十一");
    expect(num_to_chn_char("tc", "60100")).toBe("六萬零一百");
    expect(num_to_chn_char("tc", "50203")).toBe("五萬零兩百零三");
    expect(num_to_chn_char("tc", "40125")).toBe("四萬零一百二十五");
    expect(num_to_chn_char("tc", "33000")).toBe("三萬三千");
    expect(num_to_chn_char("tc", "21004")).toBe("兩萬一千零四");
    expect(num_to_chn_char("tc", "17080")).toBe("一萬七千零八十");
    expect(num_to_chn_char("tc", "88091")).toBe("八萬八千零九十一");
    expect(num_to_chn_char("tc", "79100")).toBe("七萬九千一百");
    expect(num_to_chn_char("tc", "68202")).toBe("六萬八千兩百零二");
    expect(num_to_chn_char("tc", "52411")).toBe("五萬兩千四百一十一");
    expect(num_to_chn_char("tc", "43320")).toBe("四萬三千三百二十");
    expect(num_to_chn_char("tc", "99999")).toBe("九萬九千九百九十九");

    // ten ten-thousands case (one hundred thousand)
    expect(num_to_chn_char("tc", "100000")).toBe("十萬");
    expect(num_to_chn_char("tc", "200000")).toBe("二十萬");
    expect(num_to_chn_char("tc", "315221")).toBe("三十一萬五千兩百二十一");
    expect(num_to_chn_char("tc", "420778")).toBe("四十二萬零七百七十八");
    // hundred ten-thousand case (one million)
    expect(num_to_chn_char("tc", "2222478")).toBe("兩百二十二萬兩千四百七十八");
    expect(num_to_chn_char("tc", "3007019")).toBe("三百萬七千零一十九");
    expect(num_to_chn_char("tc", "3017019")).toBe("三百零一萬七千零一十九");
    // thousand ten-million case (ten million)
    expect(num_to_chn_char("tc", "70002381")).toBe("七千萬兩千三百八十一");
    expect(num_to_chn_char("tc", "81235416")).toBe("八千一百二十三萬五千四百一十六");
    expect(num_to_chn_char("tc", "90667110")).toBe("九千零六十六萬七千一百一十");
    expect(num_to_chn_char("tc", "99999999")).toBe("九千九百九十九萬九千九百九十九");
});

test('properly translate hundred million [-99,999,999,999 , -100,000,000] U [100,000,000 , 99,999,999,999]', () => {
    expect(num_to_chn_char("sc", "-100000000")).toBe("负一亿");
    expect(num_to_chn_char("sc", "-400005213")).toBe("负四亿零五千两百一十三");
    expect(num_to_chn_char("sc", "-520006771")).toBe("负五亿两千万六千七百七十一");
    // tens hundred-million case (one billion)
    expect(num_to_chn_char("sc", "-1356914622")).toBe("负十三亿五千六百九十一万四千六百二十二");
    expect(num_to_chn_char("sc", "-6200314622")).toBe("负六十二亿零三十一万四千六百二十二");
    // hundred hundred-million case (ten billion)
    expect(num_to_chn_char("sc", "-20107100771")).toBe("负两百零一亿零七百一十万零七百七十一");
    // thousand hundred-million case (hundred billion)
    expect(num_to_chn_char("sc", "-147825639102")).toBe("负一千四百七十八亿两千五百六十三万九千一百零二");
    expect(num_to_chn_char("sc", "-999999999999")).toBe("负九千九百九十九亿九千九百九十九万九千九百九十九");
    
    expect(num_to_chn_char("sc", "100000000")).toBe("一亿");
    expect(num_to_chn_char("sc", "400005213")).toBe("四亿零五千两百一十三");
    expect(num_to_chn_char("sc", "520006771")).toBe("五亿两千万六千七百七十一");
    // tens hundred-million case (one billion)
    expect(num_to_chn_char("sc", "1356914622")).toBe("十三亿五千六百九十一万四千六百二十二");
    expect(num_to_chn_char("sc", "6200314622")).toBe("六十二亿零三十一万四千六百二十二");
    // hundred hundred-million case (ten billion)
    expect(num_to_chn_char("sc", "20107100771")).toBe("两百零一亿零七百一十万零七百七十一");
    // thousand hundred-million case (hundred billion)
    expect(num_to_chn_char("sc", "147825639102")).toBe("一千四百七十八亿两千五百六十三万九千一百零二");
    expect(num_to_chn_char("sc", "999999999999")).toBe("九千九百九十九亿九千九百九十九万九千九百九十九");

    // ---------------------- traditional chinese --------------------------//
    expect(num_to_chn_char("tc", "-100000000")).toBe("負一億");
    expect(num_to_chn_char("tc", "-400005213")).toBe("負四億零五千兩百一十三");
    expect(num_to_chn_char("tc", "-520006771")).toBe("負五億兩千萬六千七百七十一");
    // tens hundred-million case (one billion)
    expect(num_to_chn_char("tc", "-1356914622")).toBe("負十三億五千六百九十一萬四千六百二十二");
    expect(num_to_chn_char("tc", "-6200314622")).toBe("負六十二億零三十一萬四千六百二十二");
    // hundred hundred-million case (ten billion)
    expect(num_to_chn_char("tc", "-20107100771")).toBe("負兩百零一億零七百一十萬零七百七十一");
    // thousand hundred-million case (hundred billion)
    expect(num_to_chn_char("tc", "-147825639102")).toBe("負一千四百七十八億兩千五百六十三萬九千一百零二");
    expect(num_to_chn_char("tc", "-999999999999")).toBe("負九千九百九十九億九千九百九十九萬九千九百九十九");
    
    expect(num_to_chn_char("tc", "100000000")).toBe("一億");
    expect(num_to_chn_char("tc", "400005213")).toBe("四億零五千兩百一十三");
    expect(num_to_chn_char("tc", "520006771")).toBe("五億兩千萬六千七百七十一");
    // tens hundred-million case (one billion)
    expect(num_to_chn_char("tc", "1356914622")).toBe("十三億五千六百九十一萬四千六百二十二");
    expect(num_to_chn_char("tc", "6200314622")).toBe("六十二億零三十一萬四千六百二十二");
    // hundred hundred-million case (ten billion)
    expect(num_to_chn_char("tc", "20107100771")).toBe("兩百零一億零七百一十萬零七百七十一");
    // thousand hundred-million case (hundred billion)
    expect(num_to_chn_char("tc", "147825639102")).toBe("一千四百七十八億兩千五百六十三萬九千一百零二");
    expect(num_to_chn_char("tc", "999999999999")).toBe("九千九百九十九億九千九百九十九萬九千九百九十九");
});

test('properly translate trillion[-9,999,999,999,999 , -1,000,000,000,000] U [1,000,000,000,000 , 9,999,999,999,999]', () => {
    expect(num_to_chn_char("sc", "-1000000000000")).toBe("负一兆");
    expect(num_to_chn_char("sc", "-2761992517134")).toBe("负两兆七千六百一十九亿九千两百五十一万七千一百三十四");
    expect(num_to_chn_char("sc", "-9999999999999")).toBe("负九兆九千九百九十九亿九千九百九十九万九千九百九十九");
    
    expect(num_to_chn_char("sc", "1000000000000")).toBe("一兆");
    expect(num_to_chn_char("sc", "2761992517134")).toBe("两兆七千六百一十九亿九千两百五十一万七千一百三十四");
    expect(num_to_chn_char("sc", "9999999999999")).toBe("九兆九千九百九十九亿九千九百九十九万九千九百九十九");
    // ---------------------- traditional chinese --------------------------//
    expect(num_to_chn_char("tc", "-1000000000000")).toBe("負一兆");
    expect(num_to_chn_char("tc", "-2761992517134")).toBe("負兩兆七千六百一十九億九千兩百五十一萬七千一百三十四");
    expect(num_to_chn_char("tc", "-9999999999999")).toBe("負九兆九千九百九十九億九千九百九十九萬九千九百九十九"); 

    expect(num_to_chn_char("tc", "1000000000000")).toBe("一兆");
    expect(num_to_chn_char("tc", "2761992517134")).toBe("兩兆七千六百一十九億九千兩百五十一萬七千一百三十四");
    expect(num_to_chn_char("tc", "9999999999999")).toBe("九兆九千九百九十九億九千九百九十九萬九千九百九十九");
});