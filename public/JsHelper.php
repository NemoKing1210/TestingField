<?php 

namespace Helpers;

class JsHelper {

    public static $DefaultType = "let";

    public static function setValueOfVariable($value)
    {
        if (is_integer($value) || is_float($value) || is_bool($value)) return $value;
        elseif (is_string($value)) return '`'.$value.'`';
        elseif (is_array($value)) return json_encode($value);
    }

    public static function createVariable($name, $value, $type = "let") {
        $updateValue = (string) self::setValueOfVariable($value);
        $result = self::$DefaultType . " ". $name . " = " . $updateValue . ";\n";
        return $result;
    }

}