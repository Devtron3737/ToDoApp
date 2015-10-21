# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

one = ToDo.create!(title: "pickup homie", body: "at the airport", done: false)
two = ToDo.create!(title: "freestyle w/ homie", body: "greek theatre", done: false)
three = ToDo.create!(title: "drop off homie", body: "at the airport", done: false)
