//
//  Post.swift
//  Instagram
//
//  Created by Huang Yan on 10/18/22.
//

import Foundation
struct Post: Codable{
    
    let id: Int
    let title: String
    let postImgUrl: String
    let description: String
    let last_edit_date: Date
    let createdAt: Date
    let updatedAt: Date
    
}

