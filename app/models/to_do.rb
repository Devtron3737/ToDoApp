# == Schema Information
#
# Table name: to_dos
#
#  id    :integer          not null, primary key
#  title :string
#  body  :text
#  done  :boolean          default(FALSE)
#

class ToDo < ActiveRecord::Base
  validates :title, :body, presence: true

end
