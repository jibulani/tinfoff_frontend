/**
 * Created by Eugene on 05.03.2017.
 */
var is_anagram = function (word1, word2) {
    if (word1.length == word2.length){
        var chars1 = word1.split('');
        var chars2 = word2.split('');
        chars1.sort();
        chars2.sort();
        var str1 = chars1.join('');
        var str2 = chars2.join('');
        if (str1 == str2){
            return true;
        }
        return false;
    }
    return false;
}