import { Injectable } from '@angular/core';

export interface Tip {
    topic: string;
    action: string;
    title: string;
    command: string;
}

const tips = [
    {
        topic: 'changes',
        action: 'revert',
        title: 'Reverter arquivo modificado',
        command: 'git checkout <path/to/file>',
    },
    {
        topic: 'changes',
        action: 'add',
        title: 'Adicionar um arquivo para commit',
        command: 'git add <path/to/file>',
    },
    {
        topic: 'changes',
        action: 'delete',
        title: 'Excluir um arquivo',
        command: 'git rm <path/to/file>',
    },

    {
        topic: 'branches',
        action: 'delete',
        title: 'Excluir remote branches',
        command: 'git fetch origin --prune',
    },
    {
        topic: 'branches',
        action: 'delete',
        title: 'Excluir branch local',
        command: 'git branch -d <branch>',
    },
    {
        topic: 'branches',
        action: 'list',
        title: 'Listar branches',
        command: 'git branch -vv',
    },
    {
        topic: 'branches',
        action: 'merge',
        title: 'Mesclar outro branch',
        command: 'git checkout <target-branch>; git merge <source-branch>',
    },
    {
        topic: 'branches',
        action: 'merge',
        title: 'Mesclar outro branch (com conflito)',
        command: 'git commit -m "<commit message>"',
    },
    {
        topic: 'branches',
        action: 'merge',
        title: 'Cancelar merge (com conflito)',
        command: 'git merge --abort',
    },

    {
        topic: 'commits',
        action: 'revert',
        title: 'Reverter para um commit',
        command: 'git reset --hard <commit-hash>',
    },
    {
        topic: 'commits',
        action: 'revert',
        title: 'Desfazer último commit',
        command: 'git reset HEAD~1',
    },

    {
        topic: 'remotes',
        action: 'update',
        title: 'Sincronizar branch local',
        command: 'git pull --rebase',
    },
];

@Injectable()
export class TipsService {

    private getDistinct(mapFn: (item: Tip) => string) {
        return tips.map(mapFn).filter((value, index, array) => array.indexOf(value) === index);
    }

    getTopics(): string[] {
        return this.getDistinct(item => item.topic);
    }

    getActions(): string[] {
        return this.getDistinct(item => item.action);
    }

    match(topic, action): Tip[] {
        return tips.filter(item => {
            return item.topic === topic && item.action === action;
        });
    }
}