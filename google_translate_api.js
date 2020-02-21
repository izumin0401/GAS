/**
 * GET実行時
 */
function doGet(e) {

    var param          = e.parameter;
    var translatedText = fetchTranslatedText(param);
    var responseBody   = fetchResponseBody(translatedText);
    var response       = fetchResponse(responseBody);

    return response;
}

/**
 * 翻訳を取得する
 *
 * @param クエリパラメータ
 *
 * NOTE: LanguageAppクラスを使用することで無料利用できる、みたい。
 */
function fetchTranslatedText(param) {
    return LanguageApp.translate(param.text, param.source, param.target);
}

/**
 * レスポンスボディを取得する
 *
 * @param 翻訳情報
 */
function fetchResponseBody(translatedText) {
    if (translatedText) {
        return fetchResponseBodyJson(200, translatedText);
    } else {
        return fetchResponseBodyJson(500, "Error");
    }
}

/**
 * レスポンスボディJSONを取得する
 *
 * @param ステータスコード
 * @param 翻訳情報、もしくはエラーメッセージ
 */
function fetchResponseBodyJson(code, text) {
    return {
        code: code,
        text: text
    };
}

/**
 * レスポンスを取得する
 *
 * @param レスポンスボディ
 */
function fetchResponse(body) {
    var response = ContentService.createTextOutput();
    response.setMimeType(ContentService.MimeType.JSON);
    response.setContent(JSON.stringify(body));
    return response;
}