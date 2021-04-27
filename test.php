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

    $img_path = './img/d64bHTwq_ds.jpg';
    $data = exif_read_data($img_path, 0, true);

    if( empty( $data['GPS'] ) ) {
        print("GPS отсутствует");
    }

    var_dump($data);
?>


<div class="root">
    <script>
    <?= createVariable("stringV", 123); ?>
    <?= createVariable("testArray", [1 => "dsf", 2 => "hgj"], "const"); ?>
    </script>
</div>