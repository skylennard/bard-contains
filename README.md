# Bard Contains

This is a Statamic addon that extends on [Conditional Fields](https://statamic.dev/conditional-fields), so you can use the `bard-contains` custom rule against any Bard field.

As luck would have it, this works great everywhere - even in a repeater, or something much more obscure... such as a Bard-in-Bard-set onion!

## Options

This addon adds a `custom bard-contains:option` field condition to Statamic where `option` is one or more of the following:

- empty
- notEmpty
- hasParagraphs
- hasNoParagraphs
- hasSets
- hasNoSets
- debug (see [debugging](#debugging))

## Multiple Options

You can use multiple options to test for **_all of the provided_** scenarios on your Bard field.  This means you're using **AND** logic, so all options need to pass for the condition to succeed.

For instance, `custom bard-contains:hasParagraphs,hasSets` will only succeed if the Bard field has both a text paragraph and a set.

If you need to have a Bard condition succeed on either of multiple options, create separate conditions using `if_any`/`unless_any` operators.

From the Statamic Control Panel blueprint screens, these conditions are displayed as _Show/Hide when: any of the following conditions pass_.

# How to Install

You can search for this addon in the `Tools > Addons` section of the Statamic control panel and click **install**, or run the following command from your project root:

``` bash
composer require skylennard/bard-contains
```

# How to Use

Add a condition to any field, referencing a bard field

- Use the "custom" condition syntax to set up the condition:
    - `custom bard-contains:option`, with an `option` from the above list

## Example

  Fields in a Collection/Taxonomy, for instance:

```yaml
    -
      handle: customize
      field:
        type: revealer
        if:
          custom_content: 'custom bard-contains:empty'
    -
      handle: custom_content
      field:
        type: bard
        if_any:
          customize: 'equals true'
          custom_content: 'custom bard-contains:notEmpty'
```

### Results

  1. Revealer `customize` is only visible when Bard is empty.
  2. Bard `custom_content` is visible when **either**:
      - Revealer `customize` is activated and/or
      - Bard `custom_content` has existing content.

# Debugging

  Using the option `debug` can help you figure out what status the addon is seeing when checking your Bard field.  This will `console.log()` an object with the true/false status for all the options, so check it out in the inspector.
