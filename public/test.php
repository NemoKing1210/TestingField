<?php
    
    function setValueOfVariable($value)
    {
        if (is_integer($value) || is_float($value) || is_bool($value)) return $value;
        elseif (is_string($value)) return '`'.$value.'`';
        elseif (is_array($value)) return json_encode($value);
    }

    function createVariable($name, $value, $type = "let") {
        $updateValue = (string) setValueOfVariable($value);
        $result = $type . " ". $name . " = " . $updateValue . ";\n";
        return $result;
    }
?>


<div class="root">
    <script>
    <?= createVariable("stringV", 123); ?>
    <?= createVariable("testArray", [1 => "dsf", 2 => "hgj"], "const"); ?>
    </script>
</div>