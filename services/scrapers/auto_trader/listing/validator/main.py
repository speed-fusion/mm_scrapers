import sys

sys.path.append("/libs")

from playwright_driver import PlaywrightDriver

wd = PlaywrightDriver()

wd.start()

# def block_requets(route):
#     url = route.request.url
    
#     if ".png" in url or ".css" in url:
#         return route.abort()
#     return route.continue_()

# wd.page.route("*",block_requets)

wd.page.goto("https://www.autotrader.co.uk/car-details/202207248089066")
wd.page.wait_for_load_state("networkidle")
print(wd.page.url)

wd.stop()
