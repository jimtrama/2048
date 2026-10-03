import { Component, OnDestroy } from '@angular/core';

type Category =
  | 'Motion'
  | 'Looks'
  | 'Events'
  | 'Control'
  | 'Sensing'
  | 'Variables';
type Operand = 'x' | 'y' | 'score' | 'i' | 'direction' | 'size';
type Comparison = '>' | '<' | '=' | '>=' | '<=' | '!=';
interface CodeBlock {
  id: number;
  kind: string;
  category: Category;
  label: string;
  value?: string;
  suffix?: string;
  operand?: Operand;
  comparison?: Comparison;
  from?: string;
  to?: string;
  step?: string;
}
@Component({
  selector: 'app-creator-page',
  templateUrl: './creator-page.component.html',
  styleUrl: './creator-page.component.scss',
})
export class CreatorPageComponent implements OnDestroy {
  categories: { name: Category; color: string }[] = [
    { name: 'Motion', color: '#4c97ff' },
    { name: 'Looks', color: '#9966ff' },
    { name: 'Events', color: '#e5aa00' },
    { name: 'Control', color: '#ffab19' },
    { name: 'Sensing', color: '#36b7ce' },
    { name: 'Variables', color: '#ff8c1a' },
  ];
  selectedCategory: Category = 'Motion';
  tab = 'Code';
  projectName = 'My first adventure';
  saved = false;
  palette: CodeBlock[] = [
    {
      id: 0,
      kind: 'move',
      category: 'Motion',
      label: 'move',
      value: '10',
      suffix: 'steps',
    },
    {
      id: 0,
      kind: 'turn',
      category: 'Motion',
      label: 'turn ↻',
      value: '15',
      suffix: 'degrees',
    },
    { id: 0, kind: 'goto', category: 'Motion', label: 'go to center' },
    { id: 0, kind: 'x', category: 'Motion', label: 'change x by', value: '10' },
    { id: 0, kind: 'y', category: 'Motion', label: 'change y by', value: '10' },
    { id: 0, kind: 'say', category: 'Looks', label: 'say', value: 'Hello!' },
    {
      id: 0,
      kind: 'size',
      category: 'Looks',
      label: 'set size to',
      value: '100',
      suffix: '%',
    },
    { id: 0, kind: 'show', category: 'Looks', label: 'show' },
    { id: 0, kind: 'hide', category: 'Looks', label: 'hide' },
    { id: 0, kind: 'flag', category: 'Events', label: 'when ⚑ clicked' },
    {
      id: 0,
      kind: 'wait',
      category: 'Control',
      label: 'wait',
      value: '1',
      suffix: 'seconds',
    },
    {
      id: 0,
      kind: 'repeat',
      category: 'Control',
      label: 'repeat',
      value: '4',
      suffix: 'times',
    },
    { id: 0, kind: 'end', category: 'Control', label: 'end repeat' },
    {
      id: 0,
      kind: 'if',
      category: 'Control',
      label: 'if',
      operand: 'score',
      comparison: '>',
      value: '0',
      suffix: 'then',
    },
    { id: 0, kind: 'else', category: 'Control', label: 'else' },
    { id: 0, kind: 'endIf', category: 'Control', label: 'end if' },
    {
      id: 0,
      kind: 'for',
      category: 'Control',
      label: 'for i',
      from: '1',
      to: '10',
      step: '1',
    },
    { id: 0, kind: 'endFor', category: 'Control', label: 'end for' },
    { id: 0, kind: 'stop', category: 'Control', label: 'stop this script' },
    { id: 0, kind: 'position', category: 'Sensing', label: 'say my position' },
    {
      id: 0,
      kind: 'score',
      category: 'Variables',
      label: 'change score by',
      value: '1',
    },
    {
      id: 0,
      kind: 'setScore',
      category: 'Variables',
      label: 'set score to',
      value: '0',
    },
  ];
  operands: Operand[] = ['x', 'y', 'score', 'i', 'direction', 'size'];
  comparisons: Comparison[] = ['>', '<', '=', '>=', '<=', '!='];
  loopIndex = 0;
  blocks: CodeBlock[] = [];
  nextId = 1;
  running = false;
  activeId: number | null = null;
  x = 0;
  y = 0;
  direction = 90;
  size = 100;
  visible = true;
  speech = '';
  score = 0;
  costume = 'orange';
  backdrop = 'grid';
  status = 'Ready to create';
  private dragBlock?: CodeBlock;
  private dragIndex?: number;
  private runId = 0;
  constructor() {
    try {
      const data = JSON.parse(
        localStorage.getItem('2048-creator-project') || 'null',
      );
      if (
        data &&
        Array.isArray(data.blocks) &&
        data.blocks.every((b: CodeBlock) =>
          this.palette.some((p) => p.kind === b.kind),
        )
      ) {
        this.blocks = data.blocks.map((b: CodeBlock) => ({
          ...this.palette.find((p) => p.kind === b.kind)!,
          value: b.value,
          operand: b.operand,
          comparison: b.comparison,
          from: b.from,
          to: b.to,
          step: b.step,
          id: this.nextId++,
        }));
        this.projectName = String(data.name || this.projectName);
        this.costume = data.costume === 'blue' ? 'blue' : 'orange';
        this.backdrop = data.backdrop === 'plain' ? 'plain' : 'grid';
        this.saved = true;
      } else {
        this.loadStarter();
      }
    } catch {
      this.loadStarter();
    }
  }
  get categoryBlocks() {
    return this.palette.filter((b) => b.category === this.selectedCategory);
  }
  color(category: Category) {
    return this.categories.find((c) => c.name === category)!.color;
  }
  loadStarter() {
    this.blocks = ['flag', 'say', 'repeat', 'move', 'turn', 'wait', 'end'].map(
      (kind) => ({
        ...this.palette.find((b) => b.kind === kind)!,
        id: this.nextId++,
      }),
    );
    this.blocks[2].value = '12';
    this.blocks[3].value = '25';
    this.blocks[4].value = '30';
    this.blocks[5].value = '0.15';
  }
  private insert(block: CodeBlock, index: number, newBlock: boolean) {
    this.blocks.splice(index, 0, block);
    const ending =
      block.kind === 'if' ? 'endIf' : block.kind === 'for' ? 'endFor' : '';
    if (newBlock && ending)
      this.blocks.splice(index + 1, 0, {
        ...this.palette.find((b) => b.kind === ending)!,
        id: this.nextId++,
      });
  }
  add(block: CodeBlock) {
    this.stop();
    this.insert({ ...block, id: this.nextId++ }, this.blocks.length, true);
    this.persist();
  }
  blockIndent(index: number) {
    let depth = 0;
    for (let i = 0; i <= index; i++) {
      const kind = this.blocks[i].kind;
      if (['end', 'endIf', 'endFor', 'else'].includes(kind))
        depth = Math.max(0, depth - 1);
      if (i === index) return depth * 18;
      if (['repeat', 'if', 'for', 'else'].includes(kind)) depth++;
    }
    return 0;
  }
  drag(event: DragEvent, block: CodeBlock, index?: number) {
    this.dragBlock = block;
    this.dragIndex = index;
    event.dataTransfer?.setData('text/plain', block.kind);
    if (event.dataTransfer)
      event.dataTransfer.effectAllowed = index === undefined ? 'copy' : 'move';
  }
  drop(event: DragEvent, index = this.blocks.length) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.dragBlock) return;
    this.stop();
    const block = {
      ...this.dragBlock,
      id: this.dragIndex === undefined ? this.nextId++ : this.dragBlock.id,
    };
    if (this.dragIndex !== undefined) {
      this.blocks.splice(this.dragIndex, 1);
      if (this.dragIndex < index) index--;
    }
    this.insert(block, index, this.dragIndex === undefined);
    this.endDrag();
    this.persist();
  }
  endDrag() {
    this.dragBlock = undefined;
    this.dragIndex = undefined;
  }
  remove(index: number) {
    this.stop();
    this.blocks.splice(index, 1);
    this.persist();
  }
  shift(index: number, offset: number) {
    const target = index + offset;
    if (target < 0 || target >= this.blocks.length) return;
    this.stop();
    [this.blocks[index], this.blocks[target]] = [
      this.blocks[target],
      this.blocks[index],
    ];
    this.persist();
  }
  input(event: Event) {
    return (event.target as HTMLInputElement).value;
  }
  update(block: CodeBlock, event: Event) {
    this.stop();
    block.value = this.input(event);
    this.persist();
  }
  updateField(
    block: CodeBlock,
    field: 'operand' | 'comparison' | 'from' | 'to' | 'step',
    event: Event,
  ) {
    this.stop();
    Object.assign(block, { [field]: this.input(event) });
    this.persist();
  }
  private numeric(value?: string) {
    const number = value?.trim() === 'i' ? this.loopIndex : Number(value);
    return Number.isFinite(number) ? number : 0;
  }
  private condition(block: CodeBlock) {
    const left =
      block.operand === 'i' ? this.loopIndex : this[block.operand || 'score'];
    const right = this.numeric(block.value);
    switch (block.comparison) {
      case '<':
        return left < right;
      case '=':
        return left === right;
      case '>=':
        return left >= right;
      case '<=':
        return left <= right;
      case '!=':
        return left !== right;
      default:
        return left > right;
    }
  }
  persist() {
    try {
      localStorage.setItem(
        '2048-creator-project',
        JSON.stringify({
          name: this.projectName,
          blocks: this.blocks,
          costume: this.costume,
          backdrop: this.backdrop,
        }),
      );
      this.saved = true;
    } catch {
      this.saved = false;
      this.status = 'Browser storage unavailable — download to save';
    }
  }
  download() {
    const blob = new Blob(
      [
        JSON.stringify(
          {
            name: this.projectName,
            blocks: this.blocks,
            costume: this.costume,
            backdrop: this.backdrop,
          },
          null,
          2,
        ),
      ],
      { type: 'application/json' },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'scratch-project.json';
    a.click();
    URL.revokeObjectURL(url);
  }
  clear() {
    this.stop();
    this.blocks = [];
    this.reset();
    this.persist();
  }
  reset() {
    this.x = this.y = this.score = this.loopIndex = 0;
    this.direction = 90;
    this.size = 100;
    this.visible = true;
    this.speech = '';
  }
  stop() {
    this.runId++;
    this.running = false;
    this.activeId = null;
    this.status = 'Ready to create';
  }
  async run() {
    this.stop();
    this.reset();
    const token = this.runId;
    if (!this.blocks.length) {
      this.status = 'Add some blocks to get started';
      return;
    }
    const stack: {
      start: number;
      remaining: number;
      step?: number;
      previousIndex?: number;
    }[] = [];
    const scopes: { kind: string; start: number; alternate?: number }[] = [];
    const ends = new Map<number, number>();
    const alternatives = new Map<number, number>();
    for (let i = 0; i < this.blocks.length; i++) {
      const kind = this.blocks[i].kind;
      if (['repeat', 'if', 'for'].includes(kind))
        scopes.push({ kind, start: i });
      else if (kind === 'else') {
        const scope = scopes[scopes.length - 1];
        if (!scope || scope.kind !== 'if' || scope.alternate !== undefined) {
          this.status = 'Place one else inside an if / end if pair';
          return;
        }
        scope.alternate = i;
        alternatives.set(scope.start, i);
      } else if (['end', 'endIf', 'endFor'].includes(kind)) {
        const scope = scopes.pop();
        const expected =
          kind === 'end' ? 'repeat' : kind === 'endIf' ? 'if' : 'for';
        if (!scope || scope.kind !== expected) {
          this.status =
            'Match each if, for, or repeat with its own ending block';
          return;
        }
        ends.set(scope.start, i);
        if (scope.alternate !== undefined) ends.set(scope.alternate, i);
      }
      if (kind === 'for') {
        const step = Number(this.blocks[i].step);
        if (
          ![this.blocks[i].from, this.blocks[i].to, this.blocks[i].step].every(
            (v) => !!v?.trim() && Number.isFinite(Number(v)),
          ) ||
          step === 0
        ) {
          this.status = 'For loops need numeric bounds and a nonzero step';
          return;
        }
      }
    }
    if (scopes.length) {
      this.status = 'Add an end block for every if, for, and repeat';
      return;
    }
    this.running = true;
    this.status = 'Running your creation…';
    for (let i = 0; i < this.blocks.length && token === this.runId; i++) {
      const b = this.blocks[i];
      this.activeId = b.id;
      const value = this.numeric(b.value);
      let delay = 180;
      switch (b.kind) {
        case 'move':
          this.x += Math.cos(((this.direction - 90) * Math.PI) / 180) * value;
          this.y -= Math.sin(((this.direction - 90) * Math.PI) / 180) * value;
          break;
        case 'turn':
          this.direction = (((this.direction + value) % 360) + 360) % 360;
          break;
        case 'goto':
          this.x = this.y = 0;
          break;
        case 'x':
          this.x += value;
          break;
        case 'y':
          this.y += value;
          break;
        case 'say':
          this.speech = (b.value || '').replace(
            /\{i\}/g,
            String(this.loopIndex),
          );
          break;
        case 'position':
          this.speech = `x: ${Math.round(this.x)}, y: ${Math.round(this.y)}`;
          break;
        case 'size':
          this.size = Math.max(10, Math.min(200, value));
          break;
        case 'show':
          this.visible = true;
          break;
        case 'hide':
          this.visible = false;
          break;
        case 'score':
          this.score += value;
          break;
        case 'setScore':
          this.score = value;
          break;
        case 'wait':
          delay = Math.max(0, Math.min(30, value)) * 1000;
          break;
        case 'if':
          if (!this.condition(b)) i = alternatives.get(i) ?? ends.get(i)!;
          break;
        case 'else':
          i = ends.get(i)!;
          break;
        case 'repeat': {
          const count = Math.max(0, Math.min(100, Math.floor(value)));
          if (!count) i = ends.get(i)!;
          else stack.push({ start: i, remaining: count });
          break;
        }
        case 'for': {
          const from = Number(b.from),
            to = Number(b.to),
            step = Number(b.step);
          const count = Math.max(
            0,
            Math.min(100, Math.floor((to - from) / step) + 1),
          );
          if (!count) i = ends.get(i)!;
          else {
            stack.push({
              start: i,
              remaining: count,
              step,
              previousIndex: this.loopIndex,
            });
            this.loopIndex = from;
          }
          break;
        }
        case 'end':
        case 'endFor': {
          const loop = stack[stack.length - 1];
          if (--loop.remaining > 0) {
            if (loop.step !== undefined) this.loopIndex += loop.step;
            i = loop.start;
          } else {
            stack.pop();
            if (loop.previousIndex !== undefined)
              this.loopIndex = loop.previousIndex;
          }
          break;
        }
        case 'stop':
          i = this.blocks.length;
          break;
      }
      this.x = Math.max(-210, Math.min(210, this.x));
      this.y = Math.max(-150, Math.min(150, this.y));
      await new Promise<void>((resolve) => setTimeout(resolve, delay));
    }
    if (token === this.runId) {
      this.running = false;
      this.activeId = null;
      this.status = 'Script finished. Make something new!';
    }
  }
  ngOnDestroy() {
    this.stop();
  }
}
