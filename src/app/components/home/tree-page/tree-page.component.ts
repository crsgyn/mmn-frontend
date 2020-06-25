import { Component, OnInit } from '@angular/core';
import { AccountModel } from 'src/app/models/AccountModel';
import { AccountService } from 'src/app/services/backend/account.service';
import { CachingService } from 'src/app/services/caching.service';

@Component({
  selector: 'app-tree-page',
  templateUrl: './tree-page.component.html',
  styleUrls: ['./tree-page.component.scss']
})
export class TreePageComponent implements OnInit {
  self: AccountModel;
  tree: any;
  constructor(
    private cachingService: CachingService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.self = this.cachingService.getSession();
    this.accountService.showTree(this.self.id).subscribe(
      tree => {
      console.log("TCL: TreePageComponent -> ngOnInit -> tree", tree)
        this.tree = tree;
      }, treeError => {
      console.log("TCL: TreePageComponent -> ngOnInit -> treeError", treeError)

      }
    )
  }
}
