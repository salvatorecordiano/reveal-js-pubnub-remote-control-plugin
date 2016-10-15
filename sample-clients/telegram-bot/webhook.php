<?php
require __DIR__ . '/vendor/autoload.php';
$configuration = require_once 'configuration.php';

$pubnub = new Pubnub\Pubnub($configuration['publishKey'], $configuration['subscribeKey']);

$content = file_get_contents('php://input');
$update = json_decode($content, true);

if(!$update)
{
    exit;
}

$message = isset($update['message']) ? $update['message'] : '';
$messageId = isset($message['message_id']) ? $message['message_id'] : '';
$chatId = isset($message['chat']['id']) ? $message['chat']['id'] : '';
$senderId = isset($message['chat']['id']) ? $message['chat']['id'] : '';
$username = isset($message['chat']['username']) ? $message['chat']['username'] : '';
$text = isset($message['text']) ? $message['text'] : "";

$allowedActions = ['left', 'right', 'up', 'down'];

if(!in_array($username, $configuration['allowedUsernames'])) {
    exit;
}

$text = trim($text);
$text = strtolower($text);
header('Content-Type: application/json');

$response = '';

if(strpos($text, "/start") === 0)
{
    $response = 'Welcome to reveal.js Remote Control Bot';
}
else if($text && in_array($text, $allowedActions)) {
    $response = "@$username: " . $text;
    $pubnub->publish($configuration['inputChannel'], ['button' => $text]);
} else {
    $response = "Wrong message";
}

$parameters = [];
$parameters["chat_id"] = $chatId;
$parameters["text"] = $response;
$keys = [['LEFT', 'RIGHT'], ['UP', 'DOWN']];
$keyboard = ['keyboard' => $keys, 'resize_keyboard' => false, 'one_time_keyboard' => false];
$parameters["reply_markup"] = json_encode($keyboard, true);
$parameters["method"] = "sendMessage";
echo json_encode($parameters);
