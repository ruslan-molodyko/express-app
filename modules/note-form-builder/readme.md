## Jade form builder

_Possible config which describes form structure:_

1. Minimal configuration for create form:

```
login:
  field:
    - email
    - name
    - lastName
    - password
    - submit:
        type: button
```

This config will be convert to internal format like this:

Main elements of form and their attributes:

1. __Form__
    * name - [string] Id of form which will use for access to form and use as array name if need convert field names to array if not defined than will be use name of object
    * fieldNameAsArray - [bool] If true field names will be such kind name="formName[fieldName]" or false -> name="fieldName"
    * attr - [object] This attributes will be used as attributes of form tag
    * fields - [array][__required__] All fields which will be used in form
    * All the rest of attributes will be used as attributes of form tag

2. __Field__
    * name - [string] Name of field will be used in "name" attribute or if fieldNameAsArray is true than will be used as array key of main form name if not passed then will be use name of object
    * type - [string](see all possible type section) Type of field, depending of type field can have some another attributes if not defined then will be used type: text as the most often
    * label - [string] There is label of field will be displayed in label tag if not passed field name will be used 
    * attr - [object] Attributes of field tag
    * All the rest of attributes which are not specified for types will be used as attributes of field tag

All possible types:

1. text - html@input[type=text]
2. button - html@button
    * label - [string] Text of button
    * attr - [type] Can be used for specifying which type has this button for example type="submit"
3. select - html@select
    * options - [array] All options which will be used for specifying option tags in select
        - 'key' - [string] Name and value of option tag will be 'key'
        - [object] - Single object with one key and one value. Key of object will be defined as value of option tab and value of object - as key of tag. For example: {"key": "value"}
        - [object] - Complex object with name ob key and value. For example: {"name": "some_name", "value": "some_value"}
    * You can not mixed types of option

2. Full configuration:

Here is example of full form config:

```
login:
  attr:
    style:
      margin: auto
      width: 200px
  field:
    - email:
        type: text
        name: login-email
        label: Email
    - name
    - gender:
        type: select
        options:
           one: hello
           second: second
    - lastName
    -
        name: age
    - password1
    - password2
    - submit:
        type: button
```