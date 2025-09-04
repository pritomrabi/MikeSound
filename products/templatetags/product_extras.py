from django import template

register = template.Library()

@register.filter
def get_discounted_price(product, variation):
    if variation:
        return product.get_discounted_price(variation)
    return None
