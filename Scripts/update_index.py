#!/usr/bin/python

import os
import json
import logging

def collect_requirements(country):
  logging.info("Collecting %s" % country)

  for filename in os.listdir(country):
    if filename.endswith(".geo.json"): 
      logging.info(" - %s", filename)

  return []

def update_country_index(country, requirements):
  return {}

def append_world_index(requirements):
  pass

if __name__ == '__main__':
  logging.basicConfig(level=logging.INFO)

  countries = ["Canada"]

  world_summary = {
    "name": "World",
    "applicants": 0,
    "beneficiaries": 0,
    "masks_requested": 0,
    "masks_delivered": 0
  }
  world_requirments = []

  for country in countries:
    country_requirements = collect_requirements(country)
    country_summary = update_country_index(country, country_requirements)
    world_requirments.extend(country_requirements)

